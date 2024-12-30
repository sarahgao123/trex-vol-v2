import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle, UserCheck, Mail, User, Clock, Users } from 'lucide-react';
import { useCheckIn } from '../hooks/useCheckIn';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { formatLocalDateTime } from '../utils/dateUtils';

export default function CheckInPage() {
  const { positionId } = useParams<{ positionId: string }>();
  const [searchParams] = useSearchParams();
  const slotId = searchParams.get('slot');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { slot, loading, error: slotError } = useCheckIn(positionId, slotId);

  // Get list of registered volunteers who haven't checked in yet
  const pendingVolunteers = slot?.volunteer_list?.filter(v => !v.checked_in) || [];

  const handleVolunteerSelect = (selectedEmail: string) => {
    const volunteer = pendingVolunteers.find(v => v.user.email === selectedEmail);
    if (volunteer) {
      setEmail(volunteer.user.email);
      setName(volunteer.name || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (!slot?.handleCheckIn) {
        throw new Error('No active slot found');
      }

      await slot.handleCheckIn(email, name);
      setSuccess(true);
      setEmail('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (slotError) return <ErrorMessage message={slotError} />;
  if (!slot) return <ErrorMessage message="No active slot found for check-in" />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Volunteer Check-in
        </h2>
        
        <div className="mt-4 bg-white shadow rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {slot.start_time && slot.end_time ? (
                  <>
                    {formatLocalDateTime(slot.start_time)} - {formatLocalDateTime(slot.end_time)}
                  </>
                ) : (
                  'Flexible Time Slot'
                )}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {slot.checked_in_count} / {slot.volunteer_list?.length || 0} checked in
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Check-in successful!</h3>
              <p className="mt-1 text-sm text-gray-500">You're all set for the event.</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Check in another volunteer
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {pendingVolunteers.length > 0 && (
                <div>
                  <label htmlFor="volunteer-select" className="block text-sm font-medium text-gray-700">
                    Select Volunteer
                  </label>
                  <select
                    id="volunteer-select"
                    onChange={(e) => handleVolunteerSelect(e.target.value)}
                    value=""
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a registered volunteer</option>
                    {pendingVolunteers.map((volunteer) => (
                      <option key={volunteer.user.id} value={volunteer.user.email}>
                        {volunteer.name || volunteer.user.email}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="volunteer@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name (optional)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Check in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}