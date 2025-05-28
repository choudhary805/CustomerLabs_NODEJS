1. Account Management

  (a).
     Content-Type: application/json
     {
  "email": "user@example.com",
  "account_id": "acc_12345",
  "account_name": "Example Account",
  "website": "https://example.com"
    }

  (b). GET ACCOUNT :- GET http://localhost:3000/accounts/acc_12345

  (c). UPDATE ACCOUNT :- PUT http://localhost:3000/accounts/acc_12345
        Content-Type: application/json
        {
          "account_name": "Updated Account",
          "website": "https://updated.com"
        }

  (d). DELETE ACCOUNT :- DELETE http://localhost:3000/accounts/acc_12345

2. Destination Management
    (a). CREATE DESTINATION :- POST http://localhost:3000/destinations      
                  Content-Type: application/json
                  {
                    "account_id": "acc_12345",
                    "url": "https://webhook.example.com",
                    "http_method": "POST",
                    "headers": {
                      "Authorization": "Bearer abc123",
                      "Content-Type": "application/json"
                    }
                  }

   (b). Get Destination :- GET http://localhost:3000/destinations/1
   (c). Update Destination :- PUT http://localhost:3000/destinations/1
                                 Content-Type: application/json
                         {
                        "url": "https://new-webhook.example.com",
                        "http_method": "PUT",
                        "headers": {
                          "Authorization": "Bearer xyz789",
                          "X-Custom-Header": "value"
                        }
                      }

    (d). Delete Destination :- DELETE http://localhost:3000/destinations/1
    (e) Get Account Destinations :- GET http://localhost:3000/accounts/acc_12345/destinations


