import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';

export function ContactSupportSection() {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h3>
        <p className="text-gray-600">
          Our customer support team is here to assist you with any questions or concerns.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get instant help from our support team
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
            <p className="text-gray-600 text-sm mb-4">
              Speak directly with our experts
            </p>
            <Button variant="outline" className="w-full">
              1-800-EXVOLUM
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
            <p className="text-gray-600 text-sm mb-4">
              Send us a detailed message
            </p>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-blue-900">Support Hours</span>
        </div>
        <div className="text-blue-800 text-sm space-y-1">
          <p>Monday - Friday: 9:00 AM - 8:00 PM EST</p>
          <p>Saturday: 10:00 AM - 6:00 PM EST</p>
          <p>Sunday: 12:00 PM - 5:00 PM EST</p>
        </div>
      </div>
    </div>
  );
}
