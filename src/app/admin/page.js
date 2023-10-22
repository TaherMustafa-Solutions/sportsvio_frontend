"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { FaPlus, FaTrash } from "react-icons/fa";

const sizeOptions = [
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

const tagOptions = [
  { value: "blue", label: "Blue" },
  { value: "sneakers", label: "Sneakers" },
  { value: "black", label: "Black" },
  { value: "sports", label: "Sports" },
  { value: "white", label: "White" },
];

const categoryOptions = [
  { value: "sneakers", label: "Sneakers" },
  { value: "sports", label: "Sports" },
  { value: "converse", label: "Converse" },
];

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formRows, setFormRows] = useState([{ sizes: [], quantity: "" }]);

  const handleCreateSize = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createSizeOption(inputValue);
      setIsLoading(false);
      // setOptions((prev) => [...prev, newOption]);
      setSizes((prev) => [...prev, newOption]);
    }, 1000);
  };

  const createSizeOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreateColor = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createColorOption(inputValue);
      setIsLoading(false);
      // setOptions((prev) => [...prev, newOption]);
      setColor((prev) => [...prev, newOption]);
    }, 1000);
  };

  const createColorOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos(files);

    const filePreviews = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(filePreviews).then((previews) => {
      setImagePreviews(previews);
    });
  };

  const addFormRow = () => {
    setFormRows([...formRows, { sizes: [], quantity: "" }]);
  };

  const removeFormRow = (index) => {
    const newRows = [...formRows];
    newRows.splice(index, 1);
    setFormRows(newRows);
  };

  const handleSizeChange = (value, index) => {
    const newRows = [...formRows];
    newRows[index].sizes = value;
    setFormRows(newRows);
  };

  const handleQuantityChange = (event, index) => {
    const newRows = [...formRows];
    newRows[index].quantity = event.target.value;
    setFormRows(newRows);
  };

  const onSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create the form data object
    const formData = {
      sku: event.target.sku.value,
      title: event.target.title.value,
      description: event.target.description.value,
      color: color ? color.value : "", // ensure color exists
      tags: tags.map((tag) => tag.value), // extract tag values into an array
      category: category ? category.value : "", // ensure category exists
      rows: formRows.map((row, index) => ({
        size: row.sizes.value, // Get size value
        quantity: event.target[`quantity-${index}`].value,
      })),
    };

    // Log the form data
    console.log("Form data:", formData);
    console.log("Uploaded files:", photos);
  };

  return (
    <div className="mx-8 my-6">
      <div className="w-full p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
        <form className="space-y-6" action="#" onSubmit={onSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add Product
          </h5>
          <div className="flex justify-between">
            <div className="w-full mx-4">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                SKU
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter SKU"
                required
              />
            </div>
            <div className="w-full mx-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter Title"
                required
              />
            </div>
            <div className="w-full mx-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                rows={1}
                name="description"
                id="description"
                placeholder="Enter Description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-full mx-4">
              <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <CreatableSelect
                name="color"
                id="color"
                placeholder="Select Color"
                required
                isClearable
                options={colorOptions}
                onCreateOption={handleCreateColor}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(color) => setColor(color)}
                value={color}
                className="bg-gray-600 border border-gray-500 text-gray-900 text-sm rounded-lg"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: state.isFocused ? "transparent" : "transparent",
                    color: "#fff",
                  }),
                }}
              />
            </div>
            <div className="w-full mx-4">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tags
              </label>
              <CreatableSelect
                name="tags"
                id="tags"
                placeholder="Select Tags"
                required
                isClearable
                isMulti
                closeMenuOnSelect={false}
                options={tagOptions}
                onCreateOption={handleCreateColor}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(tags) => setTags(tags)}
                value={tags}
                className="bg-gray-600 border border-gray-500 text-gray-900 text-sm rounded-lg"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: state.isFocused ? "transparent" : "transparent",
                    color: "#fff",
                  }),
                }}
              />
            </div>
            <div className="w-full mx-4">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <CreatableSelect
                name="category"
                id="category"
                placeholder="Select Category"
                required
                isClearable
                options={categoryOptions}
                onCreateOption={handleCreateColor}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(category) => setCategory(category)}
                value={category}
                className="bg-gray-600 border border-gray-500 text-gray-900 text-sm rounded-lg"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: state.isFocused ? "transparent" : "transparent",
                    color: "#fff",
                  }),
                }}
              />
            </div>
            <div className="w-full mx-4">
              <label
                htmlFor="photos"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Photos
              </label>
              <input
                type="file"
                multiple
                name="photos"
                id="photos"
                onChange={handleImageChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Select Photos"
                required
              />
            </div>
          </div>
          {/* Image Previews */}
          <div className="flex justify-center image-previews mt-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="Preview"
                className="mr-2 mb-2 w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
          {/* Sub-heading and Divider */}
          <div className="mt-6">
            <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sizes and Their Respective Quantity
            </h6>
            <div className="border-b border-gray-300 dark:border-gray-600 mb-4"></div>
          </div>
          {/* Form Repeater */}
          <div className="repeater">
            {formRows.map((row, index) => (
              <div
                key={index}
                className="repeater-row flex justify-between items-center mt-4"
              >
                <div className="w-1/2 mx-2">
                  {/* Sizes dropdown */}
                  <CreatableSelect
                    name={`sizes-${index}`}
                    id={`sizes-${index}`}
                    placeholder="Select Sizes"
                    required
                    isClearable
                    options={sizeOptions}
                    onCreateOption={handleCreateSize}
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={(sizes) => handleSizeChange(sizes, index)}
                    value={row.sizes}
                    className="bg-gray-600 border border-gray-500 text-gray-900 text-sm rounded-lg"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: "transparent",
                        border: "transparent",
                      }),
                    }}
                  />
                </div>
                <div className="w-1/2 mx-2">
                  {/* Quantity input */}
                  <input
                    type="number"
                    name={`quantity-${index}`}
                    id={`quantity-${index}`}
                    placeholder="Enter Stock"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={row.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                  />
                </div>
                <button
                  onClick={() => removeFormRow(index)}
                  className="text-red-600"
                >
                  <FaTrash size={18} /> {/* This is a placeholder bin icon */}
                </button>
              </div>
            ))}
            <button
              onClick={addFormRow}
              className="ml-2 mt-2 flex items-center bg-blue-600 p-2 rounded-lg"
            >
              <FaPlus color="#fff" size={14} />{" "}
              {/* This is a placeholder plus icon */}
              <span className="ml-2 text-white text-sm">Add</span>
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
