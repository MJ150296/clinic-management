"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type PatientData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  dateOfBirth: Date | string;
  medicalHistory?: string[];
  currentMedications?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
};

const PatientForm: React.FC = () => {
  const medicalHistoryOptions = [
    "Diabetes",
    "Asthma",
    "Hypertension",
    "Allergies",
    "Heart Disease",
    "Chronic Pain",
    "Arthritis",
  ];

  const currentMedicationsOptions = [
    "Metformin",
    "Albuterol",
    "Lisinopril",
    "Atorvastatin",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
  ];

  const [filteredMedicalHistory, setFilteredMedicalHistory] = useState<
    string[]
  >([]);
  const [isMedicalHistoryDropdown, setIsMedicalHistoryDropdown] =
    useState<boolean>(false);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState<
    string[]
  >([]);

  const [filteredMedications, setFilteredMedications] = useState<string[]>([]);
  const [isMedicationsDropdown, setIsMedicationsDropdown] =
    useState<boolean>(false);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientData>({
    defaultValues: {
      medicalHistory: [],
    },
  });
  const onSubmit: SubmitHandler<PatientData> = (data) => {
    data.medicalHistory = selectedMedicalHistory || "";
    data.currentMedications = selectedMedications || "";
    console.log(data);
  };
  // console.log(watch("firstName")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
      {/* First Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">First Name</label>
        <input
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className={`border ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          } p-2 rounded w-full`}
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Last Name</label>
        <input
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          className={`border ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          } p-2 rounded w-full`}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } p-2 rounded w-full`}
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Phone</label>
        <input
          type="text"
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          })}
          className={`border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } p-2 rounded w-full`}
        />
      </div>

      {/* Address */}
      <fieldset className="mb-4 border border-gray-300 p-4 rounded">
        <legend className="text-gray-700 font-bold">Address (Optional)</legend>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Street</label>
          <input
            type="text"
            {...register("address.street")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">City</label>
          <input
            type="text"
            {...register("address.city")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">State</label>
          <input
            type="text"
            {...register("address.state")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            {...register("address.postalCode")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Country</label>
          <input
            type="text"
            {...register("address.country")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
      </fieldset>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          {...register("dateOfBirth", {
            required: "Date of birth is required",
          })}
          className={`border ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          } p-2 rounded w-full`}
        />
      </div>

      {/* Emergency Contact */}
      <fieldset className="mb-4 border border-gray-300 p-4 rounded">
        <legend className="text-gray-700 font-bold">
          Emergency Contact (Optional)
        </legend>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            {...register("emergencyContact.name")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone</label>
          <input
            type="text"
            {...register("emergencyContact.phone")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Relationship
          </label>
          <input
            type="text"
            {...register("emergencyContact.relationship")}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
      </fieldset>

      {/* Medical History & MEdication  */}

      <fieldset className="mb-4 border border-gray-300 p-4 rounded">
        <legend className="text-gray-700 font-bold">
          Medical History & Medications
        </legend>

        <div className="mb-4 relative">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Medical History
            </label>

            {/* SELECTED MEDICAL HISTORY  */}

            {selectedMedicalHistory && (
              <div className="w-full">
                <div className="p-1 flex flex-wrap gap-2">
                  {selectedMedicalHistory.map((option) => (
                    <button
                      key={option}
                      disabled={true}
                      className="py-1 px-3 text-sm bg-green-200 text-green-800 rounded-lg hover:outline-dotted hover:outline-1 hover:outline-green-800 duration-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <input
              type="text"
              {...register("medicalHistory", {
                onChange: (e) => {
                  console.log("Value changed:", e.target.value);
                  const term = e.target.value;

                  if (term.length > 0) {
                    setIsMedicalHistoryDropdown(true);
                    const filtered = medicalHistoryOptions.filter((option) =>
                      option.toLowerCase().includes(term.toLowerCase())
                    );
                    setFilteredMedicalHistory(filtered);
                  } else {
                    setIsMedicalHistoryDropdown(false);
                  }
                },
              })}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <ul className="absolute z-10 mt-1 bg-white w-full p-2">
            {isMedicalHistoryDropdown &&
              filteredMedicalHistory.map((option) => (
                <li
                  key={option}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    console.log(option);
                    if (!selectedMedicalHistory.includes(option)) {
                      setSelectedMedicalHistory([
                        ...selectedMedicalHistory,
                        option,
                      ]);
                    }
                  }}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-bold mb-2">
            Current Medications
          </label>

          {/* SELECTED MEDICATION  */}

          {selectedMedications && (
            <div className="w-full">
              <div className="p-1 flex flex-wrap gap-2">
                {selectedMedications.map((option) => (
                  <button
                    key={option}
                    disabled={true}
                    className="py-1 px-3 text-sm bg-blue-200 text-blue-800 rounded-lg hover:outline-dotted hover:outline-1 hover:outline-blue-800 duration-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <input
            type="text"
            {...register("currentMedications", {
              onChange: (e) => {
                console.log("Value changed:", e.target.value);
                const term = e.target.value;

                if (term.length > 0) {
                  setIsMedicationsDropdown(true);
                  const filtered = currentMedicationsOptions.filter((option) =>
                    option.toLowerCase().includes(term.toLowerCase())
                  );
                  setFilteredMedications(filtered);
                } else {
                  setIsMedicationsDropdown(false);
                }
              },
            })}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <ul className="absolute z-10 mt-1 bg-white w-full p-2">
            {isMedicationsDropdown &&
              filteredMedications.map((option) => (
                <li
                  key={option}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    console.log(option);
                    if (!selectedMedications.includes(option)) {
                      setSelectedMedications([...selectedMedications, option]);
                    }
                  }}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default PatientForm;
