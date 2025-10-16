import { useEffect } from "react";
import FooterAbove from "../components/FooterAbove";
import Landing from "../components/Landing";
import Navabr from "../components/Navbar";
import Section from "../components/Section";
import { fetchUser } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

function Home() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);



  return (
    <>
      <Navabr />
      <Landing />
      <Section />
      <FooterAbove />
    </>
  )
}

export default Home
