interface Props {
  data: any;
  passengerData: any;
  onUpdatePassenger?: (data: any) => void;
}

const nation = [
  // Indonesia
  "Indonesia",

  // Asia Tenggara (closest neighbors)
  "Malaysia",
  "Singapore",
  "Brunei",
  "Thailand",
  "Vietnam",
  "Laos",
  "Cambodia",
  "Myanmar",
  "Philippines",
  "Timor-Leste",

  // Nearby Asia-Pacific
  "Australia",
  "New Zealand",
  "Papua New Guinea",

  // East Asia
  "Japan",
  "South Korea",
  "North Korea",
  "China",
  "Taiwan",
  "Hong Kong",
  "Mongolia",

  // South Asia
  "India",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Bhutan",
  "Maldives",

  // Middle East
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Iran",
  "Turkey",

  // Europe
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Russia",

  // Americas
  "United States",
  "Canada",
  "Mexico",
  "Brazil",
  "Argentina",
  "Chile",

  // Africa
  "South Africa",
  "Egypt",
  "Nigeria",
  "Kenya",
];

export default function CardPassengerDetail({
  data,
  passengerData,
  onUpdatePassenger,
}: Props) {
  console.log("CardPassengerDetail data:", data);

  //   handle change for passenger details
  const handleChangePassengerDetail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onUpdatePassenger &&
      onUpdatePassenger({
        ...passengerData,
        [name]: value,
      });
  };

  return (
    <div className="w-full h-fit flex flex-col gap-3 justify-center items-start p-4 rounded-lg border border-gray-700 shadow-lg">
      <div className="font-semibold text-xl">Passenger {data}</div>
      {/* Awal Title */}
      <div className="flex flex-col gap-2 justify-center items-start cursor-pointer">
        <div className="text-sm text-slate-400">Title*</div>
        <select
          name="passengerDetailTitle"
          id="passengerDetailTitle"
          className="text-sm w-20 p-2 rounded-md text-center border border-slate-500  focus:outline-none "
          defaultValue="Mr."
          onChange={handleChangePassengerDetail}
          value={passengerData?.passengerDetailTitle || "Mr."}
        >
          <option value="Mr." className="bg-white text-black">
            Mr.
          </option>
          <option value="Mrs." className="bg-white text-black">
            Mrs.
          </option>
          <option value="Ms." className="bg-white text-black">
            Ms.
          </option>
        </select>
      </div>
      {/* Akhir Title */}
      {/* Awal First Name dan Last Name */}
      <div className="w-full h-fit flex justify-between items-center gap-5">
        {/* Awal First Name */}
        <div className="w-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm text-slate-400">
            First / Given Name & Middle Name (if any)*
          </div>
          <input
            type="text"
            name="passengerDetailFirstName"
            id="passengerDetailFirstName"
            className="text-sm w-full p-2 rounded-md border border-slate-500 focus:outline-none focus:border-blue-500"
            onChange={handleChangePassengerDetail}
            value={passengerData?.passengerDetailFirstName || ""}
          />
          <div className="text-xs text-slate-400">
            (without title and punctuation)
          </div>
        </div>
        {/* Akhir First Name */}

        {/* Awal Last Name */}
        <div className="w-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm text-slate-400">Family Name / Last Name*</div>
          <input
            type="text"
            name="passengerDetailLastName"
            id="passengerDetailLastName"
            className="text-sm w-full p-2 rounded-md border border-slate-500 focus:outline-none focus:border-blue-500"
            onChange={handleChangePassengerDetail}
            value={passengerData?.passengerDetailLastName || ""}
          />
          <div className="text-xs text-slate-400">
            (without title and punctuation)
          </div>
        </div>
        {/* Akhir Last Name */}
      </div>
      {/* Akhir First Name dan Last Name */}
      {/* Awal Date of Birth dan Nationality */}
      <div className="w-full flex justify-between items-start gap-5">
        {/* Awal Date of Birth */}
        <div className=" w-full flex flex-col gap-2 justify-center items-start cursor-pointer">
          <div className="text-sm text-slate-400">Date of Birth*</div>
          <input
            type="date"
            name="passengerDetailDateOfBirth"
            id="passengerDetailDateOfBirth"
            className="text-sm w-full p-2 rounded-md border border-slate-500 focus:outline-none focus:border-blue-500"
            onChange={handleChangePassengerDetail}
            value={passengerData?.passengerDetailDateOfBirth || ""}
            max={new Date().toISOString().split("T")[0]} // Prevent future dates
          />
          <div className="text-xs text-slate-400">
            Adult Passenger (Age 12 and older)
          </div>
        </div>
        {/* Akhir Date of Birth */}
        {/* Awal Nationality */}
        <div className="w-full flex flex-col gap-2 justify-center items-start cursor-pointer">
          <div className="text-sm text-slate-400">Nationality*</div>
          <select
            name="passengerDetailNationality"
            id="passengerDetailNationality"
            className="text-sm w-full p-2 rounded-md border border-slate-500 focus:outline-none"
            defaultValue="Indonesia"
            onChange={handleChangePassengerDetail}
            value={passengerData?.passengerDetailNationality || "Indonesia"}
          >
            {nation.map((el, index) => (
              <option className="text-black" value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
        {/* Akhir Nationality */}
      </div>
      {/* Akhir Date of Birth dan Nationality */}
    </div>
  );
}
