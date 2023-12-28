import { lazy } from 'react'
const Header = lazy(() => import('../navigation/Header'))
const Navigation = lazy(() => import('../navigation/Navigation'))
export default function Layout({ children }: any) {
    return (
        <Header>
            <Navigation>
                {children}
            </Navigation>
        </Header>
    )
}
