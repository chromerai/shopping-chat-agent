'use client';

interface ComparisonData {
  phones: any[];
  differences?: Record<string, any>;
  recommendations?: string;
}

interface ComparisonViewProps {
  comparison: ComparisonData;
}

export default function ComparisonView({ comparison }: ComparisonViewProps) {
  const { phones, differences, recommendations } = comparison;

  if (!phones || phones.length === 0) {
    return null;
  }

  const specs = [
    { key: 'price', label: 'Price', format: (v: number) => `$${v.toLocaleString()}` },
    { key: 'specs.display', label: 'Display' },
    { key: 'specs.processor', label: 'Processor' },
    { key: 'specs.camera', label: 'Camera' },
    { key: 'specs.battery', label: 'Battery' },
    { key: 'specs.ram', label: 'RAM' },
    { key: 'specs.storage', label: 'Storage' },
  ];

  const getValue = (phone: any, path: string) => {
    const keys = path.split('.');
    let value = phone;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Phone Comparison</h3>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold text-gray-700">Feature</th>
              {phones.map((phone, idx) => (
                <th key={idx} className="text-left p-2 font-semibold text-gray-900">
                  {phone.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => {
              const values = phones.map((phone) => getValue(phone, spec.key));
              const hasValue = values.some((v) => v !== undefined && v !== null);

              if (!hasValue) return null;

              return (
                <tr key={spec.key} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-gray-600">{spec.label}</td>
                  {values.map((value, idx) => (
                    <td key={idx} className="p-2">
                      {value !== undefined && value !== null
                        ? spec.format
                          ? spec.format(value)
                          : value
                        : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key Differences */}
      {differences && Object.keys(differences).length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 rounded">
          <h4 className="font-semibold text-gray-900 mb-2">Key Differences:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {Object.entries(differences).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendation:</h4>
          <p className="text-sm text-gray-700">{recommendations}</p>
        </div>
      )}
    </div>
  );
}