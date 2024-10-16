import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.css";
import { BASE_URL } from "../../utils/headers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewTour = ({ title }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTourType, setSelectedTourType] = useState("standard");
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [showDropdown, setShowDropdown] = useState(true);
  const [tourData, setTourData] = useState({
    name: "",
    overview: "",
    location: "",
    duration: "",
    transportation: false,
    groupSize: "",
    categories: [],
    attributes: [],
    languages: [""],
    availableDates: "",
    fixedDates: {
      enabled: false,
      seatsAvailable: 0,
      priceChangePerPerson: 0,
    },
    openHours: {
      enabled: false,
      pricePerPerson: 0,
      groupSize: 0,
      maxPeople: 0,
    },
    departureDetails: "",
    knowBeforeYouGo: [""],
    additionalInfo: [""],
    bannerImage: "",
    images: [],

    standardDetails: {
      itineraries: [
        {
          title: "",
          duration: "",
          meals: [""],
          image: "",
          description: "",
          day: 1,
          hotelName: "",
          hotelUrl: "",
          siteSeenPhotos: [],
          managerName: "",
          managerImage: "",
        },
      ],
      highlights: [""],
      whatsIncluded: [""],
      whatsExcluded: [""],
      price: "",
      inclusions: [""],
      exclusions: [""],
      cancellationPolicy: "",
    },

    deluxeDetails: {
      itineraries: [
        {
          title: "",
          duration: "",
          meals: [""],
          image: "",
          description: "",
          day: 1,
          hotelName: "",
          hotelUrl: "",
          siteSeenPhotos: [],
          managerName: "",
          managerImage: "",
        },
      ],
      highlights: [""],
      whatsIncluded: [""],
      whatsExcluded: [""],
      price: "",
      cancellationPolicy: "",
      inclusions: [""],
      exclusions: [""],
    },

    premiumDetails: {
      itineraries: [
        {
          title: "",
          duration: "",
          meals: [""],
          image: "",
          description: "",
          day: 1,
          hotelName: "",
          hotelUrl: "",
          siteSeenPhotos: [],
          managerName: "",
          managerImage: "",
        },
      ],
      highlights: [""],
      whatsIncluded: [""],
      whatsExcluded: [""],
      price: "",
      inclusions: [""],
      cancellationPolicy: "",
      exclusions: [""],
    },
  });



  const handleBannerImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setTourData((prevState) => ({
        ...prevState,
        bannerImage: file, // Store the File object itself
      }));
    }
  };

  const handleDeleteBanner = () => {
    setTourData((prevState) => ({
      ...prevState,
      bannerImage: "", // Clear the banner image
    }));
  };
  console.log(tourData)

  const handleFieldChange = (field, value, category) => {
    setTourData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };
 
  const handleCategorySelect = (categoryId) => {
    if (!tourData.categories.includes(categoryId)) {
      setTourData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, categoryId],
      }));
    }
  };
  const addItinerary = (type) => {
    setTourData((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        itineraries: [
          ...prevState[type].itineraries,
          {
            title: "",
            duration: "",
            meals: [""],
            image: "",
            description: "",
            day: prevState[type].itineraries.length + 1,
          },
        ],
      },
    }));
  };
  const handleSiteSeenPhotoChange = (event, itineraryIndex, detailsType) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setTourData((prevData) => {
      const updatedItineraries = [...prevData[detailsType].itineraries];
      updatedItineraries[itineraryIndex] = {
        ...updatedItineraries[itineraryIndex],
        siteSeenPhotos: [...updatedItineraries[itineraryIndex].siteSeenPhotos, ...files], // Append new photos
      };
      return {
        ...prevData,
        [detailsType]: {
          ...prevData[detailsType],
          itineraries: updatedItineraries,
        },
      };
    });
  };
  
  const handleDeleteSiteSeenPhoto = (itineraryIndex, photoIndex, itineraryType) => {
    setTourData((prevData) => {
      const updatedItineraries = [...prevData.standardDetails.itineraries];
      updatedItineraries[itineraryIndex].siteSeenPhotos = updatedItineraries[
        itineraryIndex
      ].siteSeenPhotos.filter((_, index) => index !== photoIndex);

      return {
        ...prevData,
        standardDetails: {
          ...prevData.standardDetails,
          itineraries: updatedItineraries,
        },
      };
    });
  };

  const handleAttributeSelect = (attributeId) => {
    if (!tourData.attributes.includes(attributeId)) {
      setTourData((prevData) => ({
        ...prevData,
        attributes: [...prevData.attributes, attributeId],
      }));
    }
  };
  const handleAttributeRemove = (attributeId) => {
    setTourData((prevData) => ({
      ...prevData,
      attributes: prevData.attributes.filter((id) => id !== attributeId),
    }));
  };


  const removeItinerary = (type, index) => {
    setTourData((prevState) => {
      const newItineraries = prevState[type].itineraries.filter(
        (itinerary, i) => i !== index
      );
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          itineraries: newItineraries,
        },
      };
    });
  };

  const handleMealChange = (e, index, type) => {
    const { value, checked } = e.target;

    setTourData((prevState) => {
      const newItineraries = [...prevState[type].itineraries];
      const selectedMeals = newItineraries[index].meals;

      if (checked) {
        // Add the meal if it's checked
        newItineraries[index].meals = [...selectedMeals, value];
      } else {
        // Remove the meal if it's unchecked
        newItineraries[index].meals = selectedMeals.filter((meal) => meal !== value);
      }

      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          itineraries: newItineraries,
        },
      };
    });
  };

  const handleDeletePhoto = (index) => {
    // Remove the photo at the specified index
    setTourData((prevState) => {
      const newImages = prevState.images.filter((_, i) => i !== index);
      return {
        ...prevState,
        images: newImages, // Update the images state
      };
    });
  };
  const handleCategoryRemove = (categoryId) => {
    setTourData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((id) => id !== categoryId),
    }));
  };

  // Function to handle multiple image upload
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...tourData.images];
    updatedImages[index] = file;
    setTourData({
      ...tourData,
      images: updatedImages,
    });
  };

  // Function to add more image fields
  const addImageField = () => {
    setTourData({
      ...tourData,
      images: [...tourData.images, ""], // Add a new empty string for file input
    });
  };
  const addLanguageField = () => {
    setTourData((prevData) => ({
      ...prevData,
      languages: [...prevData.languages, ""], // Adds a new empty string to the languages array
    }));
  };

  // Function to remove a language field
  const removeLanguage = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter((_, i) => i !== index),
    }));
  };

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const addArrayField = (field, category) => {
    setTourData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: [...(prev[category][field] || []), ""], // Ensure the field is an array
      },
    }));
  };

  const removeArrayField = (index, field, category) => {
    const updatedCategory = { ...tourData[category] };
    updatedCategory[field] = updatedCategory[field].filter((_, i) => i !== index);

    setTourData((prevData) => ({
      ...prevData,
      [category]: updatedCategory,
    }));
  };

  const handleItineraryChange = (index, field, value, category) => {
    if (!tourData[category] || !tourData[category].itineraries) {
      console.error(`Category "${category}" or itineraries are undefined.`);
      return;
    }

    const updatedItineraries = [...tourData[category].itineraries];
    updatedItineraries[index][field] = value;

    setTourData((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        itineraries: updatedItineraries,
      },
    }));
  };

  const addItineraryField = (category) => {
    setTourData({
      ...tourData,
      [category]: {
        ...tourData[category],
        itineraries: [
          ...tourData[category].itineraries,
          {
            title: "",
            duration: "",
            meals: [""],
            image: "",
            description: "",
            day: tourData[category].itineraries.length + 1,
          },
        ],
      },
    });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTourData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files], // Append new files to the existing ones
    }));
  };


  const handleArrayChange = (index, field, value, category) => {
    setTourData((prevData) => {
      const updatedCategory = { ...prevData[category] };

      // Ensure the field is an array
      if (!Array.isArray(updatedCategory[field])) {
        updatedCategory[field] = [];
      }

      // Update the specific index in the array
      updatedCategory[field][index] = value;

      return {
        ...prevData,
        [category]: updatedCategory,
      };
    });
  };
  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories`);
        const responseAttribute = await fetch(`${BASE_URL}/api/attributes`);

        const attributeData = await responseAttribute.json();
        console.log(attributeData)
        const data = await response.json();
        setAttributes(attributeData)
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const handleSaveChanges = async () => {
      try {
        const formData = new FormData();
  
        // Append site seen photos from standard itineraries
        if (tourData.standardDetails?.itineraries) {
          tourData.standardDetails.itineraries.forEach((itinerary) => {
            if (itinerary.siteSeenPhotos && Array.isArray(itinerary.siteSeenPhotos)) {
              itinerary.siteSeenPhotos.forEach((photo) => {
                formData.append(`standardSiteSeenPhotos`, photo);
              });
            }
          });
        }
  
        // Append site seen photos from deluxe itineraries
        if (tourData.deluxeDetails?.itineraries) {
          tourData.deluxeDetails.itineraries.forEach((itinerary) => {
            if (itinerary.siteSeenPhotos && Array.isArray(itinerary.siteSeenPhotos)) {
              itinerary.siteSeenPhotos.forEach((photo) => {
                formData.append(`deluxeSiteSeenPhotos`, photo);
              });
            }
          });
        }
  
        // Append site seen photos from premium itineraries
        if (tourData.premiumDetails?.itineraries) {
          tourData.premiumDetails.itineraries.forEach((itinerary) => {
            if (itinerary.siteSeenPhotos && Array.isArray(itinerary.siteSeenPhotos)) {
              itinerary.siteSeenPhotos.forEach((photo) => {
                formData.append(`premiumSiteSeenPhotos`, photo);
              });
            }
          });
        }
  
        // Add banner image if available
        if (tourData.bannerImage) {
          formData.append('bannerImage', tourData.bannerImage);
        }
  
        // Add images if available
        if (tourData.images && Array.isArray(tourData.images)) {
          tourData.images.forEach((image) => {
            formData.append('images', image);
          });
        }
  
        // Append other tour data fields, ensuring objects are stringified
        for (const key in tourData) {
          if (key !== 'images' && key !== 'bannerImage' && key !== 'standardDetails' && key !== 'deluxeDetails' && key !== 'premiumDetails') {
            formData.append(key, tourData[key]);
          }
        }
  
        // Serialize nested objects
        formData.append('standardDetails', JSON.stringify(tourData.standardDetails));
        formData.append('deluxeDetails', JSON.stringify(tourData.deluxeDetails));
        formData.append('premiumDetails', JSON.stringify(tourData.premiumDetails));
        formData.append('openHours', JSON.stringify(tourData.openHours));
        formData.append('fixedDates', JSON.stringify(tourData.fixedDates));
        // Send formData to the server
        const response = await fetch(`${BASE_URL}/api/createTours`, {
          method: "POST",
          body: formData, // Send FormData directly
        });
  
        if (!response.ok) {
          throw new Error("Failed to create tour");
        }
  
        const responseData = await response.json();
        console.log("API response:", responseData);
        toast.success("Tour created successfully!");
      } catch (error) {
        // console.error("Error:", error);
        // toast.error(error.message);
        console.log(error)
      }
    };
  
    handleSaveChanges();
  };
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Set the true/false value for each checkbox in the tourData object
    setTourData((prevState) => ({
      ...prevState,
      [name]: checked, // This will dynamically update based on the checkbox name (fixedDates/openHours)
    }));
  };

  const renderStandardDetails = () => (
    <div className="standardDetails">
      <h3>Standard Tour Details</h3>

      {/* Price Field */}
      <div className="formGroup">
        <label>Price</label>
        <input
          type="text"
          value={tourData.standardDetails.price}
          onChange={(e) => handleFieldChange("price", e.target.value, "standardDetails")}
          placeholder="Enter price"
        />
      </div>
      <div className="formGroup">
        <label>Standard Cancellation Policy</label>
        <input
          type="text"
          name="cancellationPolicy"
          value={tourData.standardDetails.cancellationPolicy}
          onChange={(e) => handleChange(e, "standardDetails")}
          placeholder="Enter cancellation policy"
        />
      </div>

      {/* Highlights Field */}
      <div className="formGroup">
        <label>Highlights</label>
        {tourData.standardDetails.highlights.map((highlight, index) => (
          <div key={index}>
            <input
              type="text"
              value={highlight}
              onChange={(e) =>
                handleArrayChange(index, "highlights", e.target.value, "standardDetails")
              }
              placeholder="Enter highlight"
            />
            {tourData.standardDetails.highlights.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "highlights", "standardDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("highlights", "standardDetails")} className="add-more">
          Add More Highlights
        </button>
      </div>

      {/* What's Included Field */}
      <div className="formGroup">
        <label>What's Included</label>
        {tourData.standardDetails.whatsIncluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsIncluded", e.target.value, "standardDetails")
              }
              placeholder="Enter item included"
            />
            {tourData.standardDetails.whatsIncluded.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "whatsIncluded", "standardDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsIncluded", "standardDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* What's Excluded Field */}
      <div className="formGroup">
        <label>What's Excluded</label>
        {tourData.standardDetails.whatsExcluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsExcluded", e.target.value, "standardDetails")
              }
              placeholder="Enter item excluded"
            />
            {tourData.standardDetails.whatsExcluded.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "whatsExcluded", "standardDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsExcluded", "standardDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* Inclusions Field */}
      <div className="formGroup">
        <label>Inclusions</label>
        {tourData.standardDetails.inclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "inclusions", e.target.value, "standardDetails")
              }
              placeholder="Enter inclusion"
            />
            {tourData.standardDetails.inclusions.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "inclusions", "standardDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("inclusions", "standardDetails")} className="add-more">
          Add More Inclusions
        </button>
      </div>

      {/* Exclusions Field */}
      <div className="formGroup">
        <label>Exclusions</label>
        {tourData.standardDetails.exclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "exclusions", e.target.value, "standardDetails")
              }
              placeholder="Enter exclusion"
            />
            {tourData.standardDetails.exclusions.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "exclusions", "standardDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("exclusions", "standardDetails")} className="add-more">
          Add More Exclusions
        </button>
      </div>
      <div className="formGroup">
        <h3>Standard Itineraries</h3>
        {tourData.standardDetails.itineraries.map((itinerary, index) => (
          <div key={index} className="itinerary">
            <label>Day {itinerary.day}</label>
            <input
              type="text"
              name="title"
              value={itinerary.title}
              onChange={(e) => handleItineraryChange(index, "title", e.target.value, "standardDetails")}
              placeholder="Enter itinerary title"
            />
            <input
              name="description"
              value={itinerary.description}
              onChange={(e) => handleItineraryChange(index, "description", e.target.value, "standardDetails")}
              placeholder="Enter itinerary description"
            />

            {/* Hotel Name */}
            <input
              type="text"
              name="hotelName"
              value={itinerary.hotelName}
              onChange={(e) => handleItineraryChange(index, "hotelName", e.target.value, "standardDetails")}
              placeholder="Enter hotel name"
            />

            {/* Hotel URL */}
            <input
              type="text"
              name="hotelUrl"
              value={itinerary.hotelUrl}
              onChange={(e) => handleItineraryChange(index, "hotelUrl", e.target.value, "standardDetails")}
              placeholder="Enter hotel URL"
            />

            <div className="formGroup">
             
            {tourData.standardDetails.itineraries.map((itinerary, itineraryIndex) => (
  <div key={itineraryIndex}>
    <label>Site Seen Photos</label>
    <input
      type="file"
      name="siteSeenPhotos"
      multiple
      onChange={(e) => handleSiteSeenPhotoChange(e, itineraryIndex, "standardDetails")}
    />
    
    {/* Display site seen photos */}
    {itinerary.siteSeenPhotos.length > 0 && (
      <div className="photo-preview">
        {itinerary.siteSeenPhotos.map((photo, photoIndex) => (
          <div key={photoIndex} className="photo-container">
            <img src={URL.createObjectURL(photo)} alt={`Site seen photo ${photoIndex}`} />
            <button
              className="delete-photo"
              onClick={() => handleDeleteSiteSeenPhoto(itineraryIndex, photoIndex, "standardDetails")}
            >
              &times; {/* Delete button */}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
))}


            </div>


            {/* Meals Checkboxes */}
            <div className="meals-checkbox">
              <label>
                <input
                  type="checkbox"
                  value="Breakfast"
                  checked={itinerary.meals.includes("Breakfast")}
                  onChange={(e) => handleMealChange(e, index, "standardDetails")}
                />
                Breakfast
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Lunch"
                  checked={itinerary.meals.includes("Lunch")}
                  onChange={(e) => handleMealChange(e, index, "standardDetails")}
                />
                Lunch
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Dinner"
                  checked={itinerary.meals.includes("Dinner")}
                  onChange={(e) => handleMealChange(e, index, "standardDetails")}
                />
                Dinner
              </label>
            </div>

            {/* Manager Name */}
            <input
              type="text"
              name="managerName"
              value={itinerary.managerName}
              onChange={(e) => handleItineraryChange(index, "managerName", e.target.value, "standardDetails")}
              placeholder="Enter manager name"
            />

            {/* Manager Image */}


            <button type="button" onClick={() => removeItinerary("standardDetails", index)} className="deleteButton">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItinerary("standardDetails")} className="add-more">
          Add Standard Itinerary
        </button>
      </div>


    </div>
  );

  const renderDeluxeDetails = () => (
    <div className="deluxeDetails">
      <h3>Deluxe Tour Details</h3>

      {/* Price Field */}
      <div className="formGroup">
        <label>Price</label>
        <input
          type="text"
          value={tourData.deluxeDetails.price}
          onChange={(e) => handleFieldChange("price", e.target.value, "deluxeDetails")}
          placeholder="Enter price"
        />
      </div>

      {/* Cancellation Policy */}
      <div className="formGroup">
        <label>Deluxe Cancellation Policy</label>
        <input
          type="text"
          name="cancellationPolicy"
          value={tourData.deluxeDetails.cancellationPolicy}
          onChange={(e) => handleFieldChange("cancellationPolicy", e.target.value, "deluxeDetails")}
          placeholder="Enter cancellation policy"
        />
      </div>

      {/* Highlights */}
      <div className="formGroup">
        <label>Highlights</label>
        {tourData.deluxeDetails.highlights.map((highlight, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={highlight}
              onChange={(e) =>
                handleArrayChange(index, "highlights", e.target.value, "deluxeDetails")
              }
              placeholder="Enter highlight"
            />
            {tourData.deluxeDetails.highlights.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "highlights", "deluxeDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("highlights", "deluxeDetails")} className="add-more">
          Add More Highlights
        </button>
      </div>

      {/* What's Included */}
      <div className="formGroup">
        <label>What's Included</label>
        {tourData.deluxeDetails.whatsIncluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsIncluded", e.target.value, "deluxeDetails")
              }
              placeholder="Enter included item"
            />
            {tourData.deluxeDetails.whatsIncluded.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "whatsIncluded", "deluxeDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsIncluded", "deluxeDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* What's Excluded */}
      <div className="formGroup">
        <label>What's Excluded</label>
        {tourData.deluxeDetails.whatsExcluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsExcluded", e.target.value, "deluxeDetails")
              }
              placeholder="Enter excluded item"
            />
            {tourData.deluxeDetails.whatsExcluded.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "whatsExcluded", "deluxeDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsExcluded", "deluxeDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* Inclusions */}
      <div className="formGroup">
        <label>Inclusions</label>
        {tourData.deluxeDetails.inclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "inclusions", e.target.value, "deluxeDetails")
              }
              placeholder="Enter inclusion"
            />
            {tourData.deluxeDetails.inclusions.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "inclusions", "deluxeDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("inclusions", "deluxeDetails")} className="add-more">
          Add More Inclusions
        </button>
      </div>

      {/* Exclusions */}
      <div className="formGroup">
        <label>Exclusions</label>
        {tourData.deluxeDetails.exclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "exclusions", e.target.value, "deluxeDetails")
              }
              placeholder="Enter exclusion"
            />
            {tourData.deluxeDetails.exclusions.length > 1 && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => removeArrayField(index, "exclusions", "deluxeDetails")}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("exclusions", "deluxeDetails")} className="add-more">
          Add More Exclusions
        </button>
      </div>
      <div className="formGroup">
        <h3>Deluxe Itineraries</h3>
        {tourData.deluxeDetails.itineraries.map((itinerary, index) => (
          <div key={index} className="itinerary">
            <label>Day {itinerary.day}</label>
            <input
              type="text"
              name="title"
              value={itinerary.title}
              onChange={(e) => handleItineraryChange(index, "title", e.target.value, "deluxeDetails")}
              placeholder="Enter itinerary title"
            />
            <textarea
              name="description"
              value={itinerary.description}
              onChange={(e) => handleItineraryChange(index, "description", e.target.value, "deluxeDetails")}
              placeholder="Enter itinerary description"
            />

            {/* Hotel Name */}
            <input
              type="text"
              name="hotelName"
              value={itinerary.hotelName}
              onChange={(e) => handleItineraryChange(index, "hotelName", e.target.value, "deluxeDetails")}
              placeholder="Enter hotel name"
            />

            {/* Hotel URL */}
            <input
              type="text"
              name="hotelUrl"
              value={itinerary.hotelUrl}
              onChange={(e) => handleItineraryChange(index, "hotelUrl", e.target.value, "deluxeDetails")}
              placeholder="Enter hotel URL"
            />

{tourData.deluxeDetails.itineraries.map((itinerary, itineraryIndex) => (
  <div key={itineraryIndex}>
    {/* Other itinerary details */}
    <label>Siteseen Photos</label>
    <input
      type="file"
      name="siteSeenPhotos"
      multiple
      onChange={(e) => handleSiteSeenPhotoChange(e, itineraryIndex, "deluxeDetails")} // Make sure to pass itineraryIndex
    />
    
    {/* Display site seen photos */}
    {itinerary.siteSeenPhotos.length > 0 && (
      <div className="photo-preview">
        {itinerary.siteSeenPhotos.map((photo, photoIndex) => (
          <div key={photoIndex} className="photo-container">
            <img src={URL.createObjectURL(photo)} alt={`Siteseen photo ${photoIndex}`} />
            <button
              className="delete-photo"
              onClick={() => handleDeleteSiteSeenPhoto(itineraryIndex, photoIndex, "deluxeDetails")}
            >
              &times; {/* Delete button */}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
))}


            {/* Meals Checkboxes */}
            <div className="meals-checkbox">
              <label>
                <input
                  type="checkbox"
                  value="Breakfast"
                  checked={itinerary.meals.includes("Breakfast")}
                  onChange={(e) => handleMealChange(e, index, "deluxeDetails")}
                />
                Breakfast
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Lunch"
                  checked={itinerary.meals.includes("Lunch")}
                  onChange={(e) => handleMealChange(e, index, "deluxeDetails")}
                />
                Lunch
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Dinner"
                  checked={itinerary.meals.includes("Dinner")}
                  onChange={(e) => handleMealChange(e, index, "deluxeDetails")}
                />
                Dinner
              </label>
            </div>

            {/* Manager Name */}
            <input
              type="text"
              name="managerName"
              value={itinerary.managerName}
              onChange={(e) => handleItineraryChange(index, "managerName", e.target.value, "deluxeDetails")}
              placeholder="Enter manager name"
            />

            <button type="button" onClick={() => removeItinerary("deluxeDetails", index)} className="deleteButton">
              Remove Itinerary
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItinerary("deluxeDetails")}>
          Add Deluxe Itinerary
        </button>
      </div>
    </div>
  );


  const renderPremiumDetails = () => (
    <div className="premiumDetails">
      <h3>Premium Tour Details</h3>

      {/* Price Field */}
      <div className="formGroup">
        <label>Price</label>
        <input
          type="text"
          value={tourData.premiumDetails.price}
          onChange={(e) => handleFieldChange("price", e.target.value, "premiumDetails")}
          placeholder="Enter price"
        />
      </div>
      <div className="formGroup">
        <label>Premium Cancellation Policy</label>
        <input
          type="text"
          name="cancellationPolicy"
          value={tourData.premiumDetails.cancellationPolicy}
          onChange={(e) => handleChange(e, "premiumDetails")}
          placeholder="Enter cancellation policy"
        />
      </div>
      {/* Highlights Field */}
      <div className="formGroup">
        <label>Highlights</label>
        {tourData.premiumDetails.highlights.map((highlight, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={highlight}
              onChange={(e) =>
                handleArrayChange(index, "highlights", e.target.value, "premiumDetails")
              }
              placeholder="Enter highlight"
            />
            {tourData.premiumDetails.highlights.length > 1 && (
              <button type="button" onClick={() => removeArrayField(index, "highlights", "premiumDetails")} className="deleteButton">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("highlights", "premiumDetails")} className="add-more">
          Add More Highlights
        </button>
      </div>

      {/* What's Included Field */}
      <div className="formGroup">
        <label>What's Included</label>
        {tourData.premiumDetails.whatsIncluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsIncluded", e.target.value, "premiumDetails")
              }
              placeholder="Enter item included"
            />
            {tourData.premiumDetails.whatsIncluded.length > 1 && (
              <button type="button" onClick={() => removeArrayField(index, "whatsIncluded", "premiumDetails")} className="deleteButton">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsIncluded", "premiumDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* What's Excluded Field */}
      <div className="formGroup">
        <label>What's Excluded</label>
        {tourData.premiumDetails.whatsExcluded.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "whatsExcluded", e.target.value, "premiumDetails")
              }
              placeholder="Enter item excluded"
            />
            {tourData.premiumDetails.whatsExcluded.length > 1 && (
              <button type="button" onClick={() => removeArrayField(index, "whatsExcluded", "premiumDetails")} className="deleteButton">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("whatsExcluded", "premiumDetails")} className="add-more">
          Add More Items
        </button>
      </div>

      {/* Inclusions Field */}
      <div className="formGroup">
        <label>Inclusions</label>
        {tourData.premiumDetails.inclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "inclusions", e.target.value, "premiumDetails")
              }
              placeholder="Enter inclusion"
            />
            {tourData.premiumDetails.inclusions.length > 1 && (
              <button type="button" onClick={() => removeArrayField(index, "inclusions", "premiumDetails")} className="deleteButton">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("inclusions", "premiumDetails")} className="add-more">
          Add More Inclusions
        </button>
      </div>

      {/* Exclusions Field */}
      <div className="formGroup">
        <label>Exclusions</label>
        {tourData.premiumDetails.exclusions.map((item, index) => (
          <div key={index} className="formItem">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayChange(index, "exclusions", e.target.value, "premiumDetails")
              }
              placeholder="Enter exclusion"
            />
            {tourData.premiumDetails.exclusions.length > 1 && (
              <button type="button" onClick={() => removeArrayField(index, "exclusions", "premiumDetails")} className="deleteButton">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField("exclusions", "premiumDetails")} className="add-more">
          Add More Exclusions
        </button>
      </div>
      {/* Premium Itineraries */}
      <div className="formGroup">
        <h3>Premium Itineraries</h3>
        {tourData.premiumDetails.itineraries.map((itinerary, index) => (
          <div key={index} className="itinerary">
            <label>Day {itinerary.day}</label>
            <input
              type="text"
              name="title"
              value={itinerary.title}
              onChange={(e) => handleItineraryChange(index, "title", e.target.value, "premiumDetails")}
              placeholder="Enter itinerary title"
            />
            <textarea
              name="description"
              value={itinerary.description}
              onChange={(e) => handleItineraryChange(index, "description", e.target.value, "premiumDetails")}
              placeholder="Enter itinerary description"
            />

            {/* Hotel Name */}
            <input
              type="text"
              name="hotelName"
              value={itinerary.hotelName}
              onChange={(e) => handleItineraryChange(index, "hotelName", e.target.value, "premiumDetails")}
              placeholder="Enter hotel name"
            />

            {/* Hotel URL */}
            <input
              type="text"
              name="hotelUrl"
              value={itinerary.hotelUrl}
              onChange={(e) => handleItineraryChange(index, "hotelUrl", e.target.value, "premiumDetails")}
              placeholder="Enter hotel URL"
            />

            {/* Site Seen Photos */}
            {tourData.premiumDetails.itineraries.map((itinerary, itineraryIndex) => (
  <div key={itineraryIndex}>
    <label>Siteseen Photos</label>
    <input
      type="file"
      name="siteSeenPhotos"
      multiple
      onChange={(e) => handleSiteSeenPhotoChange(e, itineraryIndex, "premiumDetails")}
    />
    
    {/* Display site seen photos */}
    {itinerary.siteSeenPhotos.length > 0 && (
      <div className="photo-preview">
        {itinerary.siteSeenPhotos.map((photo, photoIndex) => (
          <div key={photoIndex} className="photo-container">
            <img src={URL.createObjectURL(photo)} alt={`Siteseen photo ${photoIndex}`} />
            <button
              className="delete-photo"
              onClick={() => handleDeleteSiteSeenPhoto(itineraryIndex, photoIndex, "premiumDetails")}
            >
              &times; {/* Delete button */}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
))}

            {/* Meals Checkboxes */}
            <div className="meals-checkbox">
              <label>
                <input
                  type="checkbox"
                  value="Breakfast"
                  checked={itinerary.meals.includes("Breakfast")}
                  onChange={(e) => handleMealChange(e, index, "premiumDetails")}
                />
                Breakfast
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Lunch"
                  checked={itinerary.meals.includes("Lunch")}
                  onChange={(e) => handleMealChange(e, index, "premiumDetails")}
                />
                Lunch
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Dinner"
                  checked={itinerary.meals.includes("Dinner")}
                  onChange={(e) => handleMealChange(e, index, "premiumDetails")}
                />
                Dinner
              </label>
            </div>

            {/* Manager Name */}
            <input
              type="text"
              name="managerName"
              value={itinerary.managerName}
              onChange={(e) => handleItineraryChange(index, "managerName", e.target.value, "premiumDetails")}
              placeholder="Enter manager name"
            />

            <button
              type="button"
              className="deleteButton"
              onClick={() => removeItinerary("premiumDetails", index)}
            >
              Remove Itinerary
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItinerary("premiumDetails")}>
          Add Premium Itinerary
        </button>
      </div>

    </div>
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        {/* Form Fields */}
        <div className="bottom">
          <form onSubmit={handleSubmit} >
            {/* Common fields */}
            <div className="formGroup">
              <label>Tour Name</label>
              <input
                type="text"
                name="name"
                value={tourData.name}
                onChange={handleChange}
                placeholder="Enter tour name"
                required
              />
            </div>
            <div className="formGroup">
              <label>
                <input
                  type="checkbox"
                  name="fixedDates"
                  checked={tourData.fixedDates.enabled}
                  onChange={(e) =>
                    setTourData((prevState) => ({
                      ...prevState,
                      fixedDates: {
                        ...prevState.fixedDates,
                        enabled: e.target.checked,
                      },
                    }))
                  }
                />
                Fixed Dates Tour
              </label>
            </div>



            {/* Conditionally render additional fields for Fixed Dates Tour */}
            {tourData.fixedDates.enabled && (
              <div className="fixedDatesBox">
                <h4>Fixed Dates Tour Details</h4>
                <div className="formGroup">
                  <label>Seats Available</label>
                  <input
                    type="number"
                    value={tourData.fixedDates.seatsAvailable || ''}
                    onChange={(e) =>
                      setTourData((prevState) => ({
                        ...prevState,
                        fixedDates: {
                          ...prevState.fixedDates,
                          seatsAvailable: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter seats available"
                  />
                </div>

                <div className="formGroup">
                  <label>Price Change Per Person</label>
                  <input
                    type="number"
                    value={tourData.fixedDates.priceChangePerPerson || ''}
                    onChange={(e) =>
                      setTourData((prevState) => ({
                        ...prevState,
                        fixedDates: {
                          ...prevState.fixedDates,
                          priceChangePerPerson: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter price change per person"
                  />
                </div>
              </div>
            )}

            <div className="formGroup">


              <label>
                <input
                  type="checkbox"
                  name="openHours"
                  checked={tourData.openHours.enabled}
                  onChange={(e) => {
                    setTourData((prevState) => ({
                      ...prevState,
                      openHours: {
                        ...prevState.openHours,
                        enabled: e.target.checked,
                      },
                    }));
                  }}
                />
                Open Hours Tour
              </label>

            </div>
            {tourData.openHours.enabled && (
              <div className="openHoursBox">
                <h4>Open Hours Tour Details</h4>
                <div className="formGroup">
                  <label>Price Per Person</label>
                  <input
                    type="number"
                    value={tourData.openHours.pricePerPerson || ''}
                    onChange={(e) =>
                      setTourData((prevState) => ({
                        ...prevState,
                        openHours: {
                          ...prevState.openHours,
                          pricePerPerson: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter price per person"
                  />
                </div>

                <div className="formGroup">
                  <label>Group Size</label>
                  <input
                    type="number"
                    value={tourData.openHours.groupSize || ''}
                    onChange={(e) =>
                      setTourData((prevState) => ({
                        ...prevState,
                        openHours: {
                          ...prevState.openHours,
                          groupSize: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter group size"
                  />
                </div>

                <div className="formGroup">
                  <label>Max People</label>
                  <input
                    type="number"
                    value={tourData.openHours.maxPeople || ''}
                    onChange={(e) =>
                      setTourData((prevState) => ({
                        ...prevState,
                        openHours: {
                          ...prevState.openHours,
                          maxPeople: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter max people"
                  />
                </div>
              </div>
            )}


            <div className="formGroup">
              <label>Overview</label>
              <input
                type="text"
                name="overview"
                value={tourData.overview}
                onChange={handleChange}
                placeholder="Enter overview"
                required
              />
            </div>

            <div className="formGroup">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={tourData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="formGroup">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={tourData.duration}
                onChange={handleChange}
                placeholder="Enter duration"
                required
              />
            </div>

            <div className="formGroup">
              <label>Upload Banner Image</label>
              <input
                type="file"
                name="bannerImage"
                onChange={handleBannerImageChange}
              />

              {/* Display banner image preview only when it's uploaded */}
              {tourData.bannerImage && (
                <div className="banner-preview">
                  <img src={tourData.bannerImage} alt="Banner Preview" />
                  <button className="delete-banner" onClick={handleDeleteBanner}>
                    &times; {/* Delete icon for the banner image */}
                  </button>
                </div>
              )}
            </div>

            <div className="formGroup" style={{ position: "relative" }}>
              <label htmlFor="categoriesInput">Categories</label>
              <div>
                <select
                  id="categoriesInput"
                  name="categories"
                  value="" // Keep this empty to allow selecting multiple categories
                  onChange={(e) => handleCategorySelect(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>


              <div className="selectedCategories">
                {tourData.categories.map((categoryId) => {

                  return (
                    <div key={categoryId} className="categoryTag">
                      {categoryId}
                      <button
                        type="button"

                        onClick={() => handleCategoryRemove(categoryId)}
                        className="deleteIcon"
                      >
                        &#10006;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="formGroup" style={{ position: "relative" }}>
              <label htmlFor="attributesInput">Attributes</label>
              <div>
                <select
                  id="categoriesInput"
                  name="attributes"
                  value="" // Keep this empty to allow selecting multiple attributes
                  onChange={(e) => handleAttributeSelect(e.target.value)}
                >
                  <option value="">Select Attributes</option>
                  {attributes.map((attribute) => (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Attributes */}
              <div className="selectedAttributes">
                {tourData.attributes.map((attributeId) => {

                  return (
                    <div key={attributeId} className="attributeTag">
                      {attributeId}
                      <button
                        type="button"
                        onClick={() => handleAttributeRemove(attributeId)}
                        className="deleteIcon"
                      >
                        &#10006;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="formGroup">
              <label>Upload Photos</label>
              <input
                type="file"
                multiple
                name="photos"
                onChange={handleFileChange}
              />

              {/* Display image previews only when there are uploaded images */}
              {tourData.images.length > 0 && (
                <div className="photo-preview">
                  {tourData.images.map((photo, index) => (
                    <div key={index} className="photo-container">
                      <img src={photo} alt={`Uploaded preview ${index}`} />
                      <button
                        className="delete-photo"
                        onClick={() => handleDeletePhoto(index)}
                      >
                        &times; {/* You can replace this with an icon if you prefer */}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="formGroup">
              <label>Group Size</label>
              <input
                type="text"
                name="groupSize"
                value={tourData.groupSize}
                onChange={handleChange}
                placeholder="Enter group size"
              />
            </div>

            <div className="formGroup">
              <label>Transportation</label>
              <input
                type="checkbox"
                name="transportation"
                checked={tourData.transportation}
                onChange={(e) =>
                  setTourData({ ...tourData, transportation: e.target.checked })
                }
              />
            </div>

            <div className="formGroup">
              <label>Languages</label>
              {tourData.languages.map((language, index) => (
                <div key={index} className="formItem">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value) // Handle language changes
                    }
                    placeholder="Enter language"
                  />
                  <button
                    type="button"
                    className="deleteButton"
                    onClick={() => removeLanguage(index)} // Function to remove a language
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-more"
                onClick={addLanguageField} // Function to add a new language field
              >
                Add More Languages
              </button>
            </div>


            {/* Category-Specific Fields */}
            {selectedCategory && (
              <>
                <div className="formGroup">
                  <label>Price ({selectedCategory})</label>
                  <input
                    type="number"
                    name={`${selectedCategory}Price`}
                    value={tourData.price[selectedCategory]}
                    onChange={(e) =>
                      setTourData({
                        ...tourData,
                        price: {
                          ...tourData.price,
                          [selectedCategory]: e.target.value,
                        },
                      })
                    }
                    placeholder={`Enter ${selectedCategory} price`}
                  />
                </div>



                <div className="formGroup">
                  <label>Available Dates</label>
                  <input
                    type="text"
                    name="availableDates"
                    value={tourData.availableDates}
                    onChange={handleChange}
                    placeholder="Enter available dates"
                  />
                </div>

                <div className="formGroup">
                  <label>Departure Details</label>
                  <input
                    type="text"
                    name="departureDetails"
                    value={tourData.departureDetails}
                    onChange={handleChange}
                    placeholder="Enter departure details"
                  />
                </div>
                <form>
                  <div className="formGroup">
                    <label>Banner Image</label>
                    <input type="file" accept="image/*" onChange={handleBannerImageChange} />
                    {tourData.bannerImage && (
                      <div>
                        <img
                          src={URL.createObjectURL(tourData.bannerImage)}
                          alt="Banner Preview"
                          style={{ width: "200px", height: "auto", marginTop: "10px" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="formGroup">
                    <label>Images</label>
                    {tourData.images.map((_, index) => (
                      <div key={index} className="imageField">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                        {tourData.images[index] && (
                          <img
                            src={URL.createObjectURL(tourData.images[index])}
                            alt={`Preview ${index + 1}`}
                            style={{ width: "150px", height: "auto", marginTop: "10px" }}
                          />
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addImageField} style={{ marginTop: "10px" }}>
                      Add More Images
                    </button>
                  </div>
                </form>


              </>
            )}



            <div className="tourTypeButtons">
              <button
                type="button"
                onClick={() => setSelectedTourType("standard")}
                className={selectedTourType === "standard" ? "active" : ""}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setSelectedTourType("deluxe")}
                className={selectedTourType === "deluxe" ? "active" : ""}
              >
                Deluxe
              </button>
              <button
                type="button"
                onClick={() => setSelectedTourType("premium")}
                className={selectedTourType === "premium" ? "active" : ""}
              >
                Premium
              </button>
            </div>

            {/* Conditionally Render Fields Based on Selected Tour Type */}
            {selectedTourType === "standard" && renderStandardDetails()}
            {selectedTourType === "deluxe" && renderDeluxeDetails()}
            {selectedTourType === "premium" && renderPremiumDetails()}



            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
