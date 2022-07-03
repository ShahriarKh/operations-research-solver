import AppLayout from "../Components/layouts/AppLayout";
import Sidebar from "../Components/organisms/Sidebar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <AppLayout>
            <Sidebar />
            <main className={`main`}>
                <Component {...pageProps} />
            </main>
        </AppLayout>
    );
}

export default MyApp;
