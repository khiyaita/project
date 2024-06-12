function AboutFils ({img,name,job}){
    return(
        <>
        <div className="shadow-lg rounded-lg overflow-hidden w-64 mx-2">
          <div className="relative">
            <img
              className=" h-56 object-cover object-center bg-gray-50 "
              src={img}
              alt=""
              width={"100%"}
              height={"auto"}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl text-gray-800 ">{name}</h2>

            <p className="text-sm  text-gray-600">
              <span className="t">{job}</span>
            </p>
            <p className="text-sm  text-gray-600">
              <div className="flex mt-2">
                <i className="ml-2 p-1 rounded-full  bi bi-twitter"></i>
                <i className="ml-2 p-1 rounded-full  bi bi-instagram"></i>
                <i className="ml-2 p-1 rounded-full  bi bi-linkedin"></i>{" "}
              </div>
            </p>
          </div>
        </div>
        </>
    )
}
export default AboutFils ;