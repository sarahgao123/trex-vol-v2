import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, CheckCircle, MapPin, QrCode, BarChart } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="prose prose-indigo max-w-none">
          <h1>Volunteer Management System Documentation</h1>
          
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">1. Introduction</h2>
            <p>
              The Volunteer Management System is a comprehensive platform designed to streamline 
              the organization and coordination of volunteer events. This documentation provides 
              detailed information about system features, functionality, and best practices.
            </p>

            <h3>1.1 System Overview</h3>
            <p>
              The system enables organizations to:
            </p>
            <ul>
              <li>Create and manage volunteer events</li>
              <li>Define and track volunteer positions</li>
              <li>Manage time slots and schedules</li>
              <li>Track volunteer attendance using QR codes</li>
              <li>Generate comprehensive reports</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">2. Getting Started</h2>
            
            <h3>2.1 Account Access</h3>
            <ol>
              <li>Navigate to the login page</li>
              <li>Enter your email and password</li>
              <li>Click "Sign In" to access the dashboard</li>
            </ol>

            <h3>2.2 Dashboard Overview</h3>
            <p>The dashboard provides quick access to:</p>
            <ul>
              <li>Event listing and creation</li>
              <li>Position management</li>
              <li>Volunteer tracking</li>
              <li>Reporting tools</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">3. Event Management</h2>

            <h3>3.1 Creating Events</h3>
            <div className="pl-4">
              <h4>Required Information:</h4>
              <ul>
                <li>Event name</li>
                <li>Date and time</li>
                <li>Location</li>
                <li>Description</li>
              </ul>

              <h4>Steps:</h4>
              <ol>
                <li>Click "Create Event" on the dashboard</li>
                <li>Fill in the event details form</li>
                <li>Click "Create" to save the event</li>
              </ol>
            </div>

            <h3>3.2 Managing Events</h3>
            <div className="pl-4">
              <p>For each event, you can:</p>
              <ul>
                <li>Edit event details</li>
                <li>Add volunteer positions</li>
                <li>View attendance reports</li>
                <li>Delete events when needed</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">4. Position Management</h2>

            <h3>4.1 Creating Positions</h3>
            <div className="pl-4">
              <p>Each position requires:</p>
              <ul>
                <li>Position name</li>
                <li>Time range</li>
                <li>Number of volunteers needed</li>
                <li>Location details (optional)</li>
              </ul>
            </div>

            <h3>4.2 Time Slots</h3>
            <div className="pl-4">
              <p>Within each position, you can:</p>
              <ul>
                <li>Create multiple time slots</li>
                <li>Set volunteer capacity per slot</li>
                <li>Pre-assign volunteers</li>
                <li>Generate check-in QR codes</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">5. Volunteer Check-in System</h2>

            <h3>5.1 QR Code Generation</h3>
            <div className="pl-4">
              <ol>
                <li>Navigate to the position or time slot</li>
                <li>Click the QR code icon</li>
                <li>Download or share the generated code</li>
              </ol>
            </div>

            <h3>5.2 Check-in Process</h3>
            <div className="pl-4">
              <ol>
                <li>Volunteer scans QR code</li>
                <li>Enters email address</li>
                <li>Provides name (if not already registered)</li>
                <li>Confirms check-in</li>
              </ol>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">6. Reporting</h2>

            <h3>6.1 Available Reports</h3>
            <div className="pl-4">
              <ul>
                <li>Event attendance summaries</li>
                <li>Position-specific reports</li>
                <li>Volunteer participation history</li>
                <li>Check-in statistics</li>
              </ul>
            </div>

            <h3>6.2 Generating Reports</h3>
            <div className="pl-4">
              <ol>
                <li>Navigate to the event</li>
                <li>Click "View Report"</li>
                <li>Select report parameters</li>
                <li>View or export results</li>
              </ol>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">7. Best Practices</h2>

            <h3>7.1 Event Planning</h3>
            <ul>
              <li>Create events at least two weeks in advance</li>
              <li>Include detailed descriptions and instructions</li>
              <li>Set realistic volunteer requirements</li>
              <li>Consider time zones for remote events</li>
            </ul>

            <h3>7.2 Position Setup</h3>
            <ul>
              <li>Break down large events into manageable positions</li>
              <li>Set clear time ranges</li>
              <li>Include specific location details</li>
              <li>Consider volunteer skill requirements</li>
            </ul>

            <h3>7.3 Volunteer Management</h3>
            <ul>
              <li>Send QR codes in advance</li>
              <li>Monitor check-in status during events</li>
              <li>Follow up with no-shows</li>
              <li>Maintain accurate volunteer records</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mt-0">8. Support</h2>
            
            <h3>8.1 Common Issues</h3>
            <div className="pl-4">
              <h4>Check-in Problems:</h4>
              <ul>
                <li>Verify email matches registration</li>
                <li>Ensure QR code is for correct position</li>
                <li>Check internet connectivity</li>
              </ul>

              <h4>Time Slot Issues:</h4>
              <ul>
                <li>Verify slot is within position time range</li>
                <li>Check for scheduling conflicts</li>
                <li>Confirm volunteer capacity</li>
              </ul>
            </div>

            <h3>8.2 Getting Help</h3>
            <p>
              For technical support or assistance, please contact your system administrator
              or refer to the technical documentation for detailed troubleshooting steps.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}