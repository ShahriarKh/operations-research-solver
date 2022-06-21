import AppLayout from "../Components/Layouts/AppLayout";
import Sidebar from "../Components/organisms/Sidebar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <AppLayout>
            <Sidebar />
            <Component {...pageProps} />
        </AppLayout>
    );
}

export default MyApp;
