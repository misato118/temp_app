import { UserIcon, BellIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-3 flex max-w-full items-center justify-between p-6 lg:px-8"
      >
        <div className="lg:flex lg:flex-1 lg:justify-start items-center grid grid-cols-4 gap-x-5">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Application Name</span>
            {/* TODO: Change this logo later */}
            <img
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <a href="#" className="text-base text-gray-900">
            About
          </a>
          <a href="#" className="text-base text-gray-900">
            Browse
          </a>
          <a href="#" className="text-base text-gray-900">
            Help
          </a>
        </div>
        <div className="lg:flex lg:flex-1 items-center lg:justify-end gap-x-5">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            <BellIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            <UserIcon className="h-6 w-6" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
