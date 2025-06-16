import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { UserComponet } from "../../components/User/UserComponet";

export const UserPage = () => {
    return(
        <>
            <Navbar/>
            <UserComponet/>
            <Footer/>
        </>
    )
}