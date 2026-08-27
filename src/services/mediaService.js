export const INITIAL_MEDIA_ASSETS = [
  {
    id: 'med-01',
    file_name: 'apple_grading_machine.jpg',
    file_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    mime_type: 'image/jpeg',
    file_size: 245000,
    dimensions: '1200x800',
    folder: 'Products',
    alt_text: 'Apple Grading and Sorting Line'
  },
  {
    id: 'med-02',
    file_name: 'commercial_kitchen_ss304.jpg',
    file_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    mime_type: 'image/jpeg',
    file_size: 320000,
    dimensions: '1200x800',
    folder: 'Kitchens',
    alt_text: 'SS 304 Commercial Worktable'
  },
  {
    id: 'med-03',
    file_name: 'cold_press_expeller.jpg',
    file_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    mime_type: 'image/jpeg',
    file_size: 198000,
    dimensions: '1200x800',
    folder: 'Oil Expellers',
    alt_text: '10 HP Cold Press Oil Expeller'
  }
];

export const mediaService = {
  assetsState: [...INITIAL_MEDIA_ASSETS],

  getAssets() {
    return this.assetsState;
  },

  addAsset(assetData) {
    const newAsset = {
      id: `med-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...assetData
    };
    this.assetsState.unshift(newAsset);
    return newAsset;
  },

  deleteAsset(id) {
    this.assetsState = this.assetsState.filter((a) => a.id !== id);
    return true;
  }
};
