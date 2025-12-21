import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/config/api';

export interface MediaFile {
  _id: string;
  filename: string;
  url: string;
  publicId: string;
  fileType: 'image' | 'video' | 'document' | 'other';
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  folder: string;
  tags: string[];
  uploadedBy: {
    _id: string;
    username: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UploadMediaData {
  file: File;
  tags?: string[];
}

export interface UpdateMediaData {
  filename?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface MediaFilters {
  fileType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const mediaService = {
  // Get all media files
  getAll: async (filters?: MediaFilters) => {
    return apiClient.get<MediaFile[]>(API_ENDPOINTS.MEDIA, filters);
  },

  // Get media by ID
  getById: async (id: string) => {
    return apiClient.get<MediaFile>(API_ENDPOINTS.MEDIA_BY_ID(id));
  },

  // Upload media
  upload: async (data: UploadMediaData) => {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.tags) {
      formData.append('tags', JSON.stringify(data.tags));
    }

    return apiClient.post<MediaFile>(API_ENDPOINTS.MEDIA, formData);
  },

  // Update media
  update: async (id: string, data: UpdateMediaData) => {
    return apiClient.put<MediaFile>(API_ENDPOINTS.MEDIA_BY_ID(id), data);
  },

  // Delete media
  delete: async (id: string) => {
    return apiClient.delete(API_ENDPOINTS.MEDIA_BY_ID(id));
  },
};
