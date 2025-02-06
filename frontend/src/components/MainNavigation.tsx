import { Link } from "react-router-dom";

const MainNavigation = (): React.JSX.Element => {
  const usedURI = [
    { uri: "/", name: "Home" },
    { uri: "/drivers", name: "Drivers" },
    { uri: "/vehicles", name: "Vehicles" },
  ];

  return (
    <>
      <div className="flex flex-col">
        <header className="w-full">
          <nav className="flex w-full justify-start px-3 py-1 bg-black">
            <img
              src="#"
              alt="kuva"
              className="w-20 h-20 bg-black text-white border border-white"
            />
            <ul className="flex w-full justify-start items-center space-x-4 font-bold px-3">
              {usedURI.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.uri}
                      className="bg-black text-amber-500 hover:bg-amber-500 hover:text-black py-3 px-4 rounded-lg transition duration-300 ease-in-out border border-amber-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};

export default MainNavigation;
