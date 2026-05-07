import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Background3D from './Background3D';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-electric/30">
      <Background3D />
      <Navbar />
      <main className="flex-1 w-full relative z-10 pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
