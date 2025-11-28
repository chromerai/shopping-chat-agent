'use client';

import { Phone } from '@/types/shopping';

interface PhoneCardProps {
  phone: Phone;
  reason?: string;
}

export default function PhoneCard({ phone, reason }: PhoneCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition bg-white">
      {/* Phone Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        {phone.image_url ? (
          <img 
            src={phone.image_url} 
            alt={phone.model} 
            className="h-full object-contain"
          />
        ) : (
          <span className="text-4xl">📱</span>
        )}
      </div>

      {/* Phone Info */}
      <h3 className="font-bold text-lg text-gray-900">{phone.model}</h3>
      <p className="text-sm text-gray-600">{phone.brand}</p>
      <p className="text-xl font-bold text-blue-600 mt-2">
        ₹{phone.price.toLocaleString('en-IN')}
      </p>

      {/* Specs - directly access from specs object */}
      {phone.specs && (
        <div className="mt-3 space-y-1 text-sm text-gray-700">
          {phone.specs.display_size && (
            <div className="flex justify-between">
              <span className="text-gray-500">Display:</span>
              <span>{phone.specs.display_size}"</span>
            </div>
          )}
          {phone.specs.processor && (
            <div className="flex justify-between">
              <span className="text-gray-500">Processor:</span>
              <span>{phone.specs.processor}</span>
            </div>
          )}
          {phone.specs.main_camera_resolution && (
            <div className="flex justify-between">
              <span className="text-gray-500">Camera:</span>
              <span>{phone.specs.main_camera_resolution}MP</span>
            </div>
          )}
          {phone.specs.battery_capacity && (
            <div className="flex justify-between">
              <span className="text-gray-500">Battery:</span>
              <span>{phone.specs.battery_capacity}mAh</span>
            </div>
          )}
        </div>
      )}

      {/* Recommendation Reason */}
      {reason && (
        <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-gray-700">
          <p className="font-semibold text-blue-700">Why recommended:</p>
          <p className="text-xs mt-1">{reason}</p>
        </div>
      )}
    </div>
  );
}