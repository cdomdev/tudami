// import { Control } from "react-hook-form";
// import { z } from "zod";
// import { FormSchema } from "@/schemas";

// export function handleDepartmentChange(
//   departmentName: string,
//   locationsData: { departamento: string; ciudades: string[] }[],
//   setFilteredCities: (cities: string[]) => void,
//   form: Control<z.infer<typeof FormSchema>>
// ) {
//   const selectedDepartment = locationsData.find(
//     (location) => location.departamento === departmentName
//   );

//   if (selectedDepartment) {
//     setFilteredCities(selectedDepartment.ciudades);
//   } else {
//     setFilteredCities([]);
//   }

//   const currentCity = form.getValues("city");
//   if (
//     currentCity &&
//     selectedDepartment &&
//     !selectedDepartment.ciudades.includes(currentCity)
//   ) {
//     form.setValue("city", "");
//   }
// }