import React, { useState } from 'react';
import { Plus, MapPin, Calendar, DollarSign, Wrench, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const LeaseAssetsSection: React.FC = () => {
  const { language } = useApp();
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [assetType, setAssetType] = useState<'equipment' | 'land'>('equipment');
  const [assetData, setAssetData] = useState({
    title: '',
    description: '',
    location: '',
    state: '',
    district: '',
    assetType: '',
    dailyRate: '',
    availability: '',
    condition: '',
    specifications: '',
    // Land specific fields
    landSize: '',
    soilType: '',
    waterSource: '',
    // Equipment specific fields
    model: '',
    year: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAssetForm(false);
    setAssetData({
      title: '',
      description: '',
      location: '',
      state: '',
      district: '',
      assetType: '',
      dailyRate: '',
      availability: '',
      condition: '',
      specifications: '',
      landSize: '',
      soilType: '',
      waterSource: '',
      model: '',
      year: ''
    });
  };

  const equipmentTypes = [
    'Tractor', 'Harvester', 'Plough', 'Seeder', 'Thresher', 'Cultivator', 
    'Sprayer', 'Irrigation Equipment', 'Other'
  ];

  const soilTypes = [
    'Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky'
  ];

  const waterSources = [
    'Borewell', 'Canal', 'River', 'Pond', 'Rainwater', 'Mixed'
  ];

  const states = [
    'Andhra Pradesh', 'Gujarat', 'Haryana', 'Karnataka', 'Madhya Pradesh', 
    'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh'
  ];

  const mockAssets = [
    {
      id: '1',
      title: 'John Deere Tractor 5045D',
      owner: 'Rajesh Kumar',
      location: 'Punjab, India',
      type: 'Equipment',
      assetType: 'Tractor',
      dailyRate: '₹2,500/day',
      condition: 'Excellent',
      availability: 'Available',
      description: 'Well-maintained tractor with all attachments. Perfect for plowing and harvesting.',
      specifications: ['45 HP', 'Power Steering', 'PTO Available'],
      imageUrl: 'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    },
    {
      id: '2',
      title: 'Fertile Agricultural Land',
      owner: 'Suresh Patel',
      location: 'Gujarat, India',
      type: 'Land',
      assetType: 'Farmland',
      dailyRate: '₹500/acre/month',
      condition: 'Excellent',
      availability: 'Available',
      description: 'Prime agricultural land with excellent soil quality and water access.',
      specifications: ['10 Acres', 'Loamy Soil', 'Borewell Available'],
      imageUrl: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {getTranslation('leaseAssets', language)}
        </h2>
        <button
          onClick={() => setShowAssetForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>
            {language === 'hi' ? 'संपत्ति जोड़ें' : 
             language === 'gu' ? 'સંપત્તિ ઉમેરો' : 
             'Add Asset'}
          </span>
        </button>
      </div>

      {/* Asset Form Modal */}
      {showAssetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'hi' ? 'नई संपत्ति जोड़ें' : 
                   language === 'gu' ? 'નવી સંપત્તિ ઉમેરો' : 
                   'Add New Asset'}
                </h3>
                <button
                  onClick={() => setShowAssetForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Asset Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'संपत्ति का प्रकार' : language === 'gu' ? 'સંપત્તિનો પ્રકાર' : 'Asset Type'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="assetType"
                      value="equipment"
                      checked={assetType === 'equipment'}
                      onChange={() => setAssetType('equipment')}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Wrench className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'उपकरण' : language === 'gu' ? 'સાધન' : 'Equipment'}
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="assetType"
                      value="land"
                      checked={assetType === 'land'}
                      onChange={() => setAssetType('land')}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Home className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'भूमि' : language === 'gu' ? 'જમીન' : 'Land'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {assetType === 'equipment' 
                      ? (language === 'hi' ? 'उपकरण का नाम' : language === 'gu' ? 'સાધનનું નામ' : 'Equipment Name')
                      : (language === 'hi' ? 'भूमि का शीर्षक' : language === 'gu' ? 'જમીનનું શીર્ષક' : 'Land Title')
                    }
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={assetData.title}
                    onChange={(e) => setAssetData({...assetData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={assetType === 'equipment' 
                      ? (language === 'hi' ? 'जैसे: ट्रैक्टर, हार्वेस्टर' : language === 'gu' ? 'જેવા કે: ટ્રેક્ટર, હાર્વેસ્ટર' : 'e.g: Tractor, Harvester')
                      : (language === 'hi' ? 'जैसे: उपजाऊ कृषि भूमि' : language === 'gu' ? 'જેવી કે: ઉપજાઉ કૃષિ જમીન' : 'e.g: Fertile Agricultural Land')
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {assetType === 'equipment' 
                      ? (language === 'hi' ? 'उपकरण का प्रकार' : language === 'gu' ? 'સાધનનો પ્રકાર' : 'Equipment Type')
                      : (language === 'hi' ? 'भूमि का आकार (एकड़)' : language === 'gu' ? 'જમીનનું કદ (એકર)' : 'Land Size (Acres)')
                    }
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {assetType === 'equipment' ? (
                    <select
                      value={assetData.assetType}
                      onChange={(e) => setAssetData({...assetData, assetType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      {equipmentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={assetData.landSize}
                      onChange={(e) => setAssetData({...assetData, landSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="5.0"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Land Specific Fields */}
              {assetType === 'land' && (
                <div className="grid md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'मिट्टी का प्रकार' : language === 'gu' ? 'માટીનો પ્રકાર' : 'Soil Type'}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={assetData.soilType}
                      onChange={(e) => setAssetData({...assetData, soilType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      {soilTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'पानी का स्रोत' : language === 'gu' ? 'પાણીનો સ્રોત' : 'Water Source'}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={assetData.waterSource}
                      onChange={(e) => setAssetData({...assetData, waterSource: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      {waterSources.map((source) => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Equipment Specific Fields */}
              {assetType === 'equipment' && (
                <div className="grid md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'मॉडल' : language === 'gu' ? 'મોડલ' : 'Model'}
                    </label>
                    <input
                      type="text"
                      value={assetData.model}
                      onChange={(e) => setAssetData({...assetData, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'जैसे: 5045D' : language === 'gu' ? 'જેવા કે: 5045D' : 'e.g: 5045D'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'निर्माण वर्ष' : language === 'gu' ? 'બનાવટનું વર્ષ' : 'Manufacturing Year'}
                    </label>
                    <input
                      type="number"
                      min="1990"
                      max="2025"
                      value={assetData.year}
                      onChange={(e) => setAssetData({...assetData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="2020"
                    />
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'राज्य' : language === 'gu' ? 'રાજ્ય' : 'State'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={assetData.state}
                    onChange={(e) => setAssetData({...assetData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'राज्य चुनें' : language === 'gu' ? 'રાજ્ય પસંદ કરો' : 'Select State'}
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'जिला/शहर' : language === 'gu' ? 'જિલ્લો/શહેર' : 'District/City'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={assetData.district}
                    onChange={(e) => setAssetData({...assetData, district: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={language === 'hi' ? 'जिला या शहर का नाम' : language === 'gu' ? 'જિલ્લો અથવા શહેરનું નામ' : 'District or city name'}
                    required
                  />
                </div>
              </div>

              {/* Rate and Condition */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign size={16} className="inline mr-1" />
                    {assetType === 'equipment' 
                      ? (language === 'hi' ? 'दैनिक किराया' : language === 'gu' ? 'દૈનિક ભાડું' : 'Daily Rate')
                      : (language === 'hi' ? 'मासिक किराया' : language === 'gu' ? 'માસિક ભાડું' : 'Monthly Rate')
                    }
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={assetData.dailyRate}
                    onChange={(e) => setAssetData({...assetData, dailyRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={assetType === 'equipment' ? '₹2000/day' : '₹500/acre/month'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'स्थिति' : language === 'gu' ? 'સ્થિતિ' : 'Condition'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={assetData.condition}
                    onChange={(e) => setAssetData({...assetData, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                    </option>
                    <option value="Excellent">
                      {language === 'hi' ? 'बहुत अच्छी' : language === 'gu' ? 'ઉત્તમ' : 'Excellent'}
                    </option>
                    <option value="Good">
                      {language === 'hi' ? 'अच्छी' : language === 'gu' ? 'સારી' : 'Good'}
                    </option>
                    <option value="Fair">
                      {language === 'hi' ? 'ठीक-ठाक' : language === 'gu' ? 'સારી-ખરાબ' : 'Fair'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-1" />
                    {language === 'hi' ? 'उपलब्धता' : language === 'gu' ? 'ઉપલબ્ધતા' : 'Availability'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={assetData.availability}
                    onChange={(e) => setAssetData({...assetData, availability: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                    </option>
                    <option value="Available">
                      {language === 'hi' ? 'तुरंत उपलब्ध' : language === 'gu' ? 'તુરંત ઉપલબ્ધ' : 'Available Immediately'}
                    </option>
                    <option value="Next Week">
                      {language === 'hi' ? 'अगले सप्ताह' : language === 'gu' ? 'આવતા અઠવાડિયે' : 'Next Week'}
                    </option>
                    <option value="Next Month">
                      {language === 'hi' ? 'अगले महीने' : language === 'gu' ? 'આવતા મહિને' : 'Next Month'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'विवरण' : language === 'gu' ? 'વર્ણન' : 'Description'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={assetData.description}
                  onChange={(e) => setAssetData({...assetData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={assetType === 'equipment' 
                    ? (language === 'hi' ? 'उपकरण के बारे में विस्तार से बताएं' : language === 'gu' ? 'સાધન વિશે વિગતથી જણાવો' : 'Describe the equipment in detail')
                    : (language === 'hi' ? 'भूमि के बारे में विस्तार से बताएं' : language === 'gu' ? 'જમીન વિશે વિગતથી જણાવો' : 'Describe the land in detail')
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'विशिष्टताएं' : language === 'gu' ? 'વિશેષતાઓ' : 'Specifications'}
                </label>
                <textarea
                  value={assetData.specifications}
                  onChange={(e) => setAssetData({...assetData, specifications: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={assetType === 'equipment' 
                    ? (language === 'hi' ? 'जैसे: 50 HP, पावर स्टीयरिंग, आदि' : language === 'gu' ? 'જેવા કે: 50 HP, પાવર સ્ટીયરિંગ, વગેરે' : 'e.g: 50 HP, Power Steering, etc')
                    : (language === 'hi' ? 'जैसे: सिंचाई सुविधा, बिजली कनेक्शन' : language === 'gu' ? 'જેવી કે: સિંચાઈ સુવિધા, વીજળી કનેક્શન' : 'e.g: Irrigation facility, Electricity connection')
                  }
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {language === 'hi' ? 'संपत्ति जोड़ें' : language === 'gu' ? 'સંપત્તિ ઉમેરો' : 'Add Asset'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssetForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {language === 'hi' ? 'रद्द करें' : language === 'gu' ? 'રદ કરો' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Asset Listings */}
      <div className="grid gap-6">
        {mockAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={asset.imageUrl} 
                  alt={asset.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {asset.type === 'Equipment' ? (
                        <Wrench className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Home className="w-5 h-5 text-green-600" />
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        asset.type === 'Equipment' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {asset.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{asset.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {language === 'hi' ? 'मालिक:' : language === 'gu' ? 'માલિક:' : 'Owner:'} {asset.owner}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {asset.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {asset.dailyRate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    asset.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {asset.availability === 'Available' 
                      ? (language === 'hi' ? 'उपलब्ध' : language === 'gu' ? 'ઉપલબ્ધ' : 'Available')
                      : (language === 'hi' ? 'उपलब्ध नहीं' : language === 'gu' ? 'ઉપલબ્ધ નથી' : 'Not Available')
                    }
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{asset.description}</p>
                
                {asset.specifications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'hi' ? 'विशिष्टताएं:' : language === 'gu' ? 'વિશેષતાઓ:' : 'Specifications:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {asset.specifications.map((spec, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === 'hi' ? 'स्थिति:' : language === 'gu' ? 'સ્થિતિ:' : 'Condition:'} {asset.condition}
                  </span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    {language === 'hi' ? 'संपर्क करें' : language === 'gu' ? 'સંપર્ક કરો' : 'Contact Owner'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get translation
const getTranslation = (key: string, lang: string) => {
  const translations: any = {
    leaseAssets: {
      en: 'Lease Land & Equipment',
      hi: 'भूमि और उपकरण किराए पर दें',
      gu: 'જમીન અને સાધનો ભાડે આપો'
    }
  };
  
  return translations[key]?.[lang] || translations[key]?.en || key;
};

export default LeaseAssetsSection;