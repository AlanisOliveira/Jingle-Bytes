import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-[#F2F2F2] min-h-[84vh] py-2">
        {children}
      </div>
      <Footer />
    </>
  )
}