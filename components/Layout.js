import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    {/* this is the HTML head tag */}
    <Head>
      <title>Note App</title>
    </Head>

    <Navbar />

    {/* "children" specifies the components to be wrapped by this Layout component */}
    {children}
  </>
)

export default Layout;
