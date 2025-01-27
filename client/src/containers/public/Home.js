import React, { useEffect } from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAcreages())
    dispatch(actions.getProvinces())
  }, [dispatch])
  return (
    <div className='w-full flex flex-col gap-4 items-center h-full'>
      <Header />
      <Navigation />
      <Search />
      <div className='w-4/5 lg:w-3/5 flex flex-col items-center justify-center mt-3'>
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className='h-[500px]'>

      </div>
    </div>
  );
};

export default Home;
