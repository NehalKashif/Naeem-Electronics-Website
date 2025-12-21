/**
 * Reusable Form Components for Admin Panel
 * 
 * Use these components to quickly build admin forms
 * Example usage shown at the bottom
 */

import React from 'react';

// Form Container
export function FormContainer({ 
  children, 
  onSubmit, 
  title 
}: { 
  children: React.ReactNode; 
  onSubmit: (e: React.FormEvent) => void;
  title: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  );
}

// Text Input Field
export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
      />
    </div>
  );
}

// Textarea Field
export function FormTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
      />
    </div>
  );
}

// Select Dropdown
export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Checkbox/Toggle
export function FormToggle({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

// File Input with Preview
export function FormFileInput({
  label,
  name,
  onChange,
  accept = 'image/*',
  preview,
  required = false,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  preview?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}
      
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        accept={accept}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}

// Form Buttons
export function FormButtons({
  onCancel,
  submitText = 'Save',
  cancelText = 'Cancel',
  isLoading = false,
}: {
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex gap-4 pt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : submitText}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
      >
        {cancelText}
      </button>
    </div>
  );
}

// Error Message
export function FormError({ message }: { message: string }) {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {message}
    </div>
  );
}

/**
 * EXAMPLE USAGE:
 * 
 * import {
 *   FormContainer,
 *   FormInput,
 *   FormTextarea,
 *   FormSelect,
 *   FormToggle,
 *   FormFileInput,
 *   FormButtons,
 *   FormError,
 * } from '@/components/admin/FormComponents';
 * 
 * export default function CreateProductPage() {
 *   const [formData, setFormData] = useState({
 *     name: '',
 *     category: '',
 *     originalPrice: 0,
 *     shortDescription: '',
 *     isFeatured: false,
 *   });
 *   const [error, setError] = useState('');
 *   const [loading, setLoading] = useState(false);
 *   
 *   const handleChange = (e) => {
 *     const { name, value, type, checked } = e.target;
 *     setFormData(prev => ({
 *       ...prev,
 *       [name]: type === 'checkbox' ? checked : value
 *     }));
 *   };
 *   
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     setLoading(true);
 *     // Call API here
 *     setLoading(false);
 *   };
 *   
 *   return (
 *     <FormContainer title="Create Product" onSubmit={handleSubmit}>
 *       <FormError message={error} />
 *       
 *       <FormInput
 *         label="Product Name"
 *         name="name"
 *         value={formData.name}
 *         onChange={handleChange}
 *         required
 *         placeholder="Enter product name"
 *       />
 *       
 *       <FormSelect
 *         label="Category"
 *         name="category"
 *         value={formData.category}
 *         onChange={handleChange}
 *         options={[
 *           { value: 'lighting', label: 'Lighting' },
 *           { value: 'cooling', label: 'Cooling' },
 *         ]}
 *         required
 *       />
 *       
 *       <FormInput
 *         label="Price"
 *         name="originalPrice"
 *         type="number"
 *         value={formData.originalPrice}
 *         onChange={handleChange}
 *         required
 *       />
 *       
 *       <FormTextarea
 *         label="Short Description"
 *         name="shortDescription"
 *         value={formData.shortDescription}
 *         onChange={handleChange}
 *         required
 *       />
 *       
 *       <FormToggle
 *         label="Featured Product"
 *         name="isFeatured"
 *         checked={formData.isFeatured}
 *         onChange={handleChange}
 *       />
 *       
 *       <FormButtons
 *         onCancel={() => router.back()}
 *         isLoading={loading}
 *       />
 *     </FormContainer>
 *   );
 * }
 */
