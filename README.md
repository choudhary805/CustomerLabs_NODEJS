1. Account Management

  (a).
     Content-Type: application/json
     {
  "email": "abhi@gmail.com",
  "account_id": "acc_12345",
  "account_name": "abhi",
  "website": "https://abhi.com"
    }

  (b). GET ACCOUNT :- GET http://localhost:3000/accounts/acc_12345

  (c). UPDATE ACCOUNT :- PUT http://localhost:3000/accounts/acc_12345
        Content-Type: application/json
        {
          "account_name": "abhi Account",
          "website": "https://abhi.com"
        }

  (d). DELETE ACCOUNT :- DELETE http://localhost:3000/accounts/acc_12345

2. Destination Management
    (a). CREATE DESTINATION :- POST http://localhost:3000/destinations      
                  Content-Type: application/json
                  {
                    "account_id": "acc_12345",
                    "url": "https://webhook.abhi.com",
                    "http_method": "POST",
                    "headers": {
                      "Authorization": "abhi123",
                      "Content-Type": "application/json"
                    }
                  }

   (b). Get Destination :- GET http://localhost:3000/destinations/1
   (c). Update Destination :- PUT http://localhost:3000/destinations/1
                                 Content-Type: application/json
                         {
                        "url": "https://new-webhook.abhi.com",
                        "http_method": "PUT",
                        "headers": {
                          "Authorization": "abhi123",
                          "X-Custom-Header": "value"
                        }
                      }

    (d). Delete Destination :- DELETE http://localhost:3000/destinations/1
    (e) Get Account Destinations :- GET http://localhost:3000/accounts/acc_12345/destinations


