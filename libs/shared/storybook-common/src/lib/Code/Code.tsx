import React, { FC } from "react";
import { CopyBlock, github as theme } from "react-code-blocks";
import "./Code.css";
type Language =
  | "abap"
  | "actionscript"
  | "ada"
  | "arduino"
  | "autoit"
  | "c"
  | "clojure"
  | "coffeescript"
  | "cpp"
  | "cs"
  | "csharp"
  | "css"
  | "cuda"
  | "d"
  | "dart"
  | "delphi"
  | "elixir"
  | "elm"
  | "erlang"
  | "fortran"
  | "foxpro"
  | "fsharp"
  | "go"
  | "gql"
  | "graphql"
  | "groovy"
  | "haskell"
  | "haxe"
  | "html"
  | "java"
  | "javascript"
  | "js"
  | "json"
  | "jsx"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "lua"
  | "makefile"
  | "mathematica"
  | "matlab"
  | "objective"
  | "objective"
  | "objectivec"
  | "objectpascal"
  | "ocaml"
  | "octave"
  | "perl"
  | "php"
  | "powershell"
  | "prolog"
  | "puppet"
  | "python"
  | "qml"
  | "r"
  | "racket"
  | "rest"
  | "restructuredtext"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "shell"
  | "smalltalk"
  | "sml"
  | "sql"
  | "standardml"
  | "swift"
  | "tcl"
  | "tex"
  | "text"
  | "ts"
  | "tsx"
  | "typescript"
  | "vala"
  | "vbnet"
  | "verilog"
  | "vhdl"
  | "xml"
  | "xquery"
  | "yaml";

interface Props {
  lang: Language;
  code: string;
  tabSize?: number;
}

const cleanTabs = (code = "", tabSize: number): string => {
  const lines = code.split("\n");

  if (lines.length === 1) {
    return code.trim();
  }

  const space0 = lines[0].length - lines[0].trimLeft().length;
  const space1 = lines[1].length - lines[1].trimLeft().length;
  const space = space0 < tabSize ? space1 : space0;

  return lines
    .map((line) => line.substring(space))
    .join("\n")
    .trim();
};

export const CodeSnippet: FC<Props> = ({ lang, code, tabSize = 2 }) => {
  const cleanCode = cleanTabs(code, tabSize);

  return (
    <div className="goa-code-snippet">
      <CopyBlock
        codeBlock={true}
        text={cleanCode}
        showLineNumbers={false}
        language={lang}
        theme={theme}
      />
    </div>
  );
};
