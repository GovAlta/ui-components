import { Outlet, useLocation } from 'react-router-dom';
import {
    GoabxWorkSideMenu,
    GoabxWorkSideMenuItem,
} from '@abgov/react-components/experimental';
import { MenuProvider, useMenu } from '../workspace/contexts/MenuContext';
import { PageHeaderProvider } from '../workspace/contexts/PageHeaderContext';
import { PageFooterProvider } from '../workspace/contexts/PageFooterContext';
import { ScrollStateProvider, useScrollState } from '../workspace/contexts/ScrollStateContext';
import { PageHeader } from '../workspace/components/PageHeader';
import { PageFooter } from '../workspace/components/PageFooter';

/**
 * Inner workspace layout that uses the menu context.
 */
function WorkspaceLayoutInner() {
    const { menuOpen, setMenuOpen, isMobile } = useMenu();
    const { scrollPosition } = useScrollState();
    const location = useLocation();

    // Check if a path is active
    const isActive = (path: string) => {
        if (path === '/workspace') {
            return location.pathname === '/workspace';
        }
        return location.pathname.startsWith(path);
    };

    // Handle toggle - V2 API uses () => void
    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="app-layout">
            <GoabxWorkSideMenu
                heading="Digital Service"
                url="/workspace"
                userName="Worker"
                userSecondaryText="worker@example.gov.ab.ca"
                open={menuOpen}
                onToggle={handleToggle}
                primaryContent={
                    <>
                        <GoabxWorkSideMenuItem
                            icon="grid"
                            label="Dashboard"
                            url="/workspace"
                            current={isActive('/workspace') && !location.pathname.includes('/cases')}
                        />
                        <GoabxWorkSideMenuItem
                            icon="list"
                            label="Cases"
                            url="/workspace/cases"
                            current={isActive('/workspace/cases')}
                        />
                    </>
                }
                accountContent={
                    <GoabxWorkSideMenuItem
                        icon="log-out"
                        label="Exit to citizen view"
                        url="/"
                    />
                }
            />
            {/* Main content area - sibling to menu, not children */}
            <div className="main-content-area">
                {!isMobile ? (
                    <div className="card-container" style={{ height: '100%', overflow: 'hidden' }}>
                        <div
                            className="desktop-card-container"
                            data-scroll-state={scrollPosition}
                        >
                            <PageHeader />
                            <Outlet />
                            <PageFooter />
                        </div>
                    </div>
                ) : (
                    <div className="mobile-content-container" style={{ height: '100%', overflow: 'auto' }}>
                        <PageHeader />
                        <Outlet />
                        <PageFooter />
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Workspace layout with sidebar navigation.
 * Wraps content in context providers for menu, header, footer, and scroll state.
 */
export function WorkspaceLayout() {
    return (
        <MenuProvider>
            <PageHeaderProvider>
                <PageFooterProvider>
                    <ScrollStateProvider>
                        <WorkspaceLayoutInner />
                    </ScrollStateProvider>
                </PageFooterProvider>
            </PageHeaderProvider>
        </MenuProvider>
    );
}
