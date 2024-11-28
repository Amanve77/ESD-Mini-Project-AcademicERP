export const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      return 'Please upload a valid image file.';
    }
    if (file.size > 2 * 1024 * 1024) {
      return 'File size must be less than 2MB.';
    }
    return null;
  };
  