import MainNavigation from "../components/MainNavigation.tsx";

const ErrorPage = ():React.JSX.Element => {
    return (
        <>
            <MainNavigation />
            <h1>404 - Page Not Found</h1>
        </>
    )
}

export default ErrorPage;