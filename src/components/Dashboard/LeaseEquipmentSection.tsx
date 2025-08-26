import React, { useState } from 'react';
import { Plus, MapPin, Calendar, DollarSign, Wrench } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const LeaseEquipmentSection: React.FC = () => {
  const { language } = useApp();
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [equipmentData, setEquipmentData] = useState({
    title: '',
    description: '',
    location: '',
    equipmentType: '',
    dailyRate: '',
    availability: '',
    condition: '',
    specifications: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to backend
    setShowEquipmentForm(false);
    setEquipmentData({
      title: '',
      description: '',
      location: '',
      equipmentType: '',
      dailyRate: '',
      availability: '',
      condition: '',
      specifications: ''
    });
  };

  const mockEquipment = [
    {
      id: '1',
      title: 'John Deere Tractor 5045D',
      owner: 'Rajesh Kumar',
      location: 'Punjab, India',
      equipmentType: 'Tractor',
      dailyRate: '₹2,500/day',
      condition: 'Excellent',
      availability: 'Available',
      description: 'Well-maintained tractor with all attachments. Perfect for plowing and harvesting.',
      specifications: ['45 HP', 'Power Steering', 'PTO Available'],
      imageUrl: 'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    },
    {
      id: '2',
      title: 'Harvester Combine New Holland',
      owner: 'Suresh Patel',
      location: 'Gujarat, India',
      equipmentType: 'Harvester',
      dailyRate: '₹5,000/day',
      condition: 'Good',
      availability: 'Available',
      description: 'Efficient combine harvester suitable for wheat, rice, and other grain crops.',
      specifications: ['Self-propelled', 'Grain tank 4500L', 'GPS enabled'],
      imageUrl: 'https://images.pexels.com/photos/2889542/pexels-photo-2889542.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'उपकरण किराए पर दें' : 
           language === 'gu' ? 'સાધનો ભાડે આપો' : 
           'Lease Equipment'}
        </h2>
        <button
          onClick={() => setShowEquipmentForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>
            {language === 'hi' ? 'उपकरण जोड़ें' : 
             language === 'gu' ? 'સાધન ઉમેરો' : 
             'Add Equipment'}
          </span>
        </button>
      </div>

      {/* Equipment Form Modal */}
      {showEquipmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'hi' ? 'नया उपकरण जोड़ें' : 
                   language === 'gu' ? 'નવું સાધન ઉમેરો' : 
                   'Add New Equipment'}
                </h3>
                <button
                  onClick={() => setShowEquipmentForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'उपकरण का नाम' : language === 'gu' ? 'સાધનનું નામ' : 'Equipment Name'}
                    </label>
                    <input
                      type="text"
                      value={equipmentData.title}
                      onChange={(e) => setEquipmentData({...equipmentData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'जैसे: ट्रैक्टर, हार्वेस्टर' : language === 'gu' ? 'જેવા કે: ટ્રેક્ટર, હાર્વેસ્ટર' : 'e.g: Tractor, Harvester'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'उपकरण का प्रकार' : language === 'gu' ? 'સાધનનો પ્રકાર' : 'Equipment Type'}
                    </label>
                    <select
                      value={equipmentData.equipmentType}
                      onChange={(e) => setEquipmentData({...equipmentData, equipmentType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      <option value="Tractor">
                        {language === 'hi' ? 'ट्रैक्टर' : language === 'gu' ? 'ટ્રેક્ટર' : 'Tractor'}
                      </option>
                      <option value="Harvester">
                        {language === 'hi' ? 'हार्वेस्टर' : language === 'gu' ? 'હાર્વેસ્ટર' : 'Harvester'}
                      </option>
                      <option value="Plough">
                        {language === 'hi' ? 'हल' : language === 'gu' ? 'હળ' : 'Plough'}
                      </option>
                      <option value="Seeder">
                        {language === 'hi' ? 'बोने की मशीन' : language === 'gu' ? 'વાવવાનું મશીન' : 'Seeder'}
                      </option>
                      <option value="Other">
                        {language === 'hi' ? 'अन्य' : language === 'gu' ? 'અન્ય' : 'Other'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      {language === 'hi' ? 'स्थान' : language === 'gu' ? 'સ્થાન' : 'Location'}
                    </label>
                    <input
                      type="text"
                      value={equipmentData.location}
                      onChange={(e) => setEquipmentData({...equipmentData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'शहर, राज्य' : language === 'gu' ? 'શહેર, રાજ્ય' : 'City, State'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-1" />
                      {language === 'hi' ? 'दैनिक किराया' : language === 'gu' ? 'દૈનિક ભાડું' : 'Daily Rate'}
                    </label>
                    <input
                      type="text"
                      value={equipmentData.dailyRate}
                      onChange={(e) => setEquipmentData({...equipmentData, dailyRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? '₹2000/दिन' : language === 'gu' ? '₹2000/દિવસ' : '₹2000/day'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'स्थिति' : language === 'gu' ? 'સ્થિતિ' : 'Condition'}
                    </label>
                    <select
                      value={equipmentData.condition}
                      onChange={(e) => setEquipmentData({...equipmentData, condition: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      <option value="Excellent">
                        {language === 'hi' ? 'बहुत अच्छी' : language === 'gu' ? 'ઉત્તम' : 'Excellent'}
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
                    </label>
                    <input
                      type="text"
                      value={equipmentData.availability}
                      onChange={(e) => setEquipmentData({...equipmentData, availability: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'जैसे: तुरंत उपलब्ध' : language === 'gu' ? 'જેવા કે: તુરંત ઉપલબ્ધ' : 'e.g: Available immediately'}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'विवरण' : language === 'gu' ? 'વર્ણન' : 'Description'}
                  </label>
                  <textarea
                    value={equipmentData.description}
                    onChange={(e) => setEquipmentData({...equipmentData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={language === 'hi' ? 'उपकरण के बारे में विस्तार से बताएं' : language === 'gu' ? 'સાધન વિશે વિગતથી જણાવો' : 'Describe the equipment in detail'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'विशिष्टताएं' : language === 'gu' ? 'વિશેષતાઓ' : 'Specifications'}
                  </label>
                  <textarea
                    value={equipmentData.specifications}
                    onChange={(e) => setEquipmentData({...equipmentData, specifications: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={language === 'hi' ? 'जैसे: 50 HP, पावर स्टीयरिंग, आदि' : language === 'gu' ? 'જેવા કે: 50 HP, પાવર સ્ટીયરિંગ, વગેરે' : 'e.g: 50 HP, Power Steering, etc'}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {language === 'hi' ? 'उपकरण जोड़ें' : language === 'gu' ? 'સાધન ઉમેરો' : 'Add Equipment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEquipmentForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {language === 'hi' ? 'रद्द करें' : language === 'gu' ? 'રદ કરો' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Listings */}
      <div className="grid gap-6">
        {mockEquipment.map((equipment) => (
          <div key={equipment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={equipment.imageUrl} 
                  alt={equipment.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{equipment.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {language === 'hi' ? 'मालिक:' : language === 'gu' ? 'માલિક:' : 'Owner:'} {equipment.owner}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {equipment.location}
                      </span>
                      <span className="flex items-center">
                        <Wrench size={14} className="mr-1" />
                        {equipment.equipmentType}
                      </span>
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {equipment.dailyRate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    equipment.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {equipment.availability === 'Available' 
                      ? (language === 'hi' ? 'उपलब्ध' : language === 'gu' ? 'ઉપલબ્ધ' : 'Available')
                      : (language === 'hi' ? 'उपलब्ध नहीं' : language === 'gu' ? 'ઉપલબ્ધ નથી' : 'Not Available')
                    }
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{equipment.description}</p>
                
                {equipment.specifications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'hi' ? 'विशिष्टताएं:' : language === 'gu' ? 'વિશેષતાઓ:' : 'Specifications:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {equipment.specifications.map((spec, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === 'hi' ? 'स्थिति:' : language === 'gu' ? 'સ્થિતિ:' : 'Condition:'} {equipment.condition}
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

export default LeaseEquipmentSection;