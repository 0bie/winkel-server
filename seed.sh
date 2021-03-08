# Add seed data to `WINKEL_SSR_DB` database
mongoimport --db WINKEL_SSR_DB --collection companies --file ./db/seed/companies.json --jsonArray
mongoimport --db WINKEL_SSR_DB --collection contacts --file ./db/seed/contacts.json --jsonArray
mongoimport --db WINKEL_SSR_DB --collection products --file ./db/seed/products.json --jsonArray
