import requests
import sys
from datetime import datetime
import json

class EcoIndusAPITester:
    def __init__(self, base_url="https://undead-hunter-28.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                if params:
                    response = requests.post(url, headers=headers, params=params)
                else:
                    response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    print("Response: Non-JSON response")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_create_consultation(self):
        """Test consultation request creation"""
        test_data = {
            "company_name": f"Test Company {datetime.now().strftime('%H%M%S')}",
            "contact_name": "João Silva",
            "email": "joao@testcompany.com",
            "phone": "(67) 99999-9999",
            "industry": "manufacturing",
            "project_type": "energy_efficiency",
            "message": "Interested in energy efficiency consultation",
            "preferred_date": "2024-12-15"
        }
        
        success, response = self.run_test(
            "Create Consultation Request",
            "POST",
            "api/consultation",
            200,
            data=test_data
        )
        
        if success and response:
            # Validate response structure
            required_fields = ['id', 'company_name', 'contact_name', 'email', 'phone', 'industry', 'project_type']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False, response
            return True, response
        return False, {}

    def test_get_consultations(self):
        """Test getting consultation requests"""
        return self.run_test(
            "Get Consultation Requests",
            "GET",
            "api/consultations",
            200
        )

    def test_calculate_carbon(self):
        """Test carbon calculation"""
        success, response = self.run_test(
            "Calculate Carbon Savings",
            "POST",
            "api/calculate-carbon",
            200,
            params={
                'waste_amount': 100.0,
                'energy_usage': 500.0
            }
        )
        
        if success and response:
            # Validate calculation response structure
            required_fields = ['waste_amount', 'energy_usage', 'carbon_saved', 'trees_equivalent', 'revenue_potential']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False, response
            
            # Validate calculation logic
            expected_carbon = (100 * 0.5) + (500 * 0.3)  # Based on server logic
            if abs(response['carbon_saved'] - expected_carbon) > 0.01:
                print(f"❌ Carbon calculation mismatch: expected {expected_carbon}, got {response['carbon_saved']}")
                return False, response
            
            return True, response
        return False, {}

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper errors"""
        success, _ = self.run_test(
            "Invalid Endpoint (404)",
            "GET",
            "api/nonexistent",
            404
        )
        return success

def main():
    print("🚀 Starting EcoIndus Solutions API Tests")
    print("=" * 50)
    
    # Setup
    tester = EcoIndusAPITester()
    
    # Run all tests
    print("\n📋 BACKEND API TESTS")
    print("-" * 30)
    
    # Test 1: Root endpoint
    tester.test_root_endpoint()
    
    # Test 2: Create consultation
    success, consultation_data = tester.test_create_consultation()
    consultation_id = consultation_data.get('id') if success else None
    
    # Test 3: Get consultations
    tester.test_get_consultations()
    
    # Test 4: Carbon calculation
    tester.test_calculate_carbon()
    
    # Test 5: Invalid endpoint
    tester.test_invalid_endpoints()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests PASSED!")
        return 0
    else:
        print("⚠️  Some backend tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())