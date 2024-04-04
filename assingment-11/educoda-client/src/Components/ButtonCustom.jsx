function ButtonCustom({ children }) {
  return (
    <>
      <a
        className=" text-lg inline-block rounded   pb-2 pt-2.5 
            uppercase leading-normal text-white shadow-md transition
            duration-150 ease-in-out hover:bg-[#4f3c9e] hover:shadow-lg
            focus:bg-[#4f3c9e] focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-[#4f3c9e] active:shadow-lg dark:shadow-md
            dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-md cursor-pointer font-bold bg-[#6440FA] py-[21px] px-[41px]"
      >
        {children}
      </a>
    </>
  );
}

export default ButtonCustom;
