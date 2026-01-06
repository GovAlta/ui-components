import { useState, useEffect, useRef } from 'react';
import { Document } from 'flexsearch';
import { GoabBadge, GoabBlock, GoabButton, GoabInput, GoabPopover, GoabText }  from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  component: string;
  description: string;
  previewUrl: string;
  filePath: string;
  urlPath: string;
  tags: string[];
  [key: string]: string | string[];
}

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder = "Search components..." }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const indexRef = useRef<Document<SearchResult> | null>(null);
  const searchDataRef = useRef<SearchResult[]>([]);

  useEffect(() => {
    async function initializeSearch() {
      try {
        const response = await fetch('/search-index.json');
        const data: SearchResult[] = await response.json();
        searchDataRef.current = data;

        const index = new Document<SearchResult>({
          tokenize: 'forward',
          document: {
            id: 'id',
            index: ['title', 'content', 'component', 'description', 'tags:0', 'tags:1', 'tags:2'],
            store: ['id', 'title', 'component', 'path', 'tags', 'description', "previewUrl"]
          }
        });

        data.forEach(doc => {
          index.add(doc);
        });

        indexRef.current = index;
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize search:', error);
        setIsLoading(false);
      }
    }

    initializeSearch();
  }, []);

  useEffect(() => {
    if (!indexRef.current || !query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = indexRef.current.search(query, {
      limit: 10,
      enrich: true
    });

    const flatResults: SearchResult[] = [];
    searchResults.forEach((fieldResults: any) => {
      fieldResults.result.forEach((item: any) => {
        const existingIndex = flatResults.findIndex(r => r.id === item.id);
        if (existingIndex === -1) {
          const fullDoc = searchDataRef.current.find(d => d.id === item.id);
          if (fullDoc) {
            flatResults.push(fullDoc);
          }
        }
      });
    });

    setResults(flatResults);
  }, [query]);

  const handleInputChange = (e: GoabInputOnChangeDetail) => {
    setQuery(e.value);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const getPreview = (content: string, query: string, maxLength = 150) => {
    if (!query.trim()) {
      return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 100);
    const preview = (start > 0 ? '...' : '') +
                   content.substring(start, end) +
                   (end < content.length ? '...' : '');

    return highlightMatch(preview, query);
  };

  return (
    <div>
      <GoabPopover
        position="below"
        minWidth="60ch"
        target={<>
          <GoabInput
            name="search"
            value={query}
            onChange={handleInputChange}
            placeholder={isLoading ? "Loading search index..." : placeholder}
            width="60ch"
            disabled={isLoading}
          />
        </>}
      >
        {results.map((result) => (
          <a href={result.urlPath} key={result.id} className="search-result-item">
            <GoabText as="h3" size="heading-m" mb="s" mt="s">
              <span dangerouslySetInnerHTML={{
                __html: highlightMatch(result.title, query)
              }} />
            </GoabText>
            {result.tags && result.tags.length > 0 && (
              <GoabBlock gap="s" mb="l">
                {result.tags.map((tag, idx) => (
                  <GoabBadge key={idx} type="information" content={tag} />
                ))}
              </GoabBlock>
            )}
            <GoabText as="p">
              <span dangerouslySetInnerHTML={{
                __html: getPreview(result.description, query)
              }} />
            </GoabText>
            <div>{result.path}</div>
          </a>
        ))}

        {query && results.length === 0 && (
          <div>No results found for "{query}"</div>
        )}

        {!query && results.length === 0 && (
          <div>Search...</div>
        )}
      </GoabPopover>


      <style>{`
        a.search-result-item {
          padding: 1rem;
          display: block;
          border-bottom: 1px solid #eee;
          text-decoration: none!important;
          transition: background-color 200ms;
        }
        a.search-result-item:hover {
          background-color: #eee;
        }
        .search-result-item:last-of-type {
          border-bottom: none;
        }

        mark {
          background-color: #fff59d;
        }
      `}</style>
    </div>
  );
}
