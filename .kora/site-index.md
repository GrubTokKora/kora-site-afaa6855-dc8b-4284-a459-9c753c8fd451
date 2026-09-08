# Site index · format 1
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Kora Demo Stamford: Delicious Lunch, Dinner & Takeout
purpose: The landing page — offers, a menu teaser, hours, gallery, events, reviews, contact and newsletter sign-up.
sections:
- `#top` "Kora Demo Stamford: Your Go-To for Lunch, Dinner & Takeout" — the hero
- `#heroImg` — the hero image
- `#offers` "Our Offers" — the current promotions, each with an expiry date
- `#menu-page` "Our Menu" — a teaser for the menu with View Full Menu and Order Online actions
- `#about` "About Kora Demo" — the restaurant's story
- `#hours_location` "Hours & Location" — the block holding the opening hours and the address
- `#hours` "Opening Hours" — the weekly opening hours, one row per day
- `#location` "Location" — the address
- `#gallery` "Gallery" — photographs of the food and the room
- `#events` "Events" — a teaser for the events page
- `#testimonials` "What Our Customers Say" — 3 named customer reviews: Rama Ramachandran, Tihomir S, Nire Lewis
- `#contact` "Contact Us" — the address, phone, email and hours, beside the enquiry form
- `#contact-form` — the enquiry form
- `#contact-name` — the form's name input
- `#contact-email` — the form's email input
- `#contact-phone` — the form's phone input
- `#contact-message` — the form's message textarea
- `#recaptcha-container` — the form's captcha slot
- `#contact-submit-btn` — the form's submit button
- `#contact-form-message` — where the form's success or error message is written
- `#newsletter` "Join Our Inner Circle" — the newsletter sign-up, offering both email and SMS updates
- `#newsletter-form` — the sign-up form
- `#nl-email` — the sign-up email input
- `#nl-phone` — the sign-up phone input
- `#nl-email-opt` — the email consent checkbox
- `#nl-sms-opt` — the SMS consent checkbox
- `#nl-submit-btn` — the sign-up submit button, with its label in a span
- `#nl-message` — where the sign-up's success or error message is written
- `#tiktok` "Follow us on TikTok" — the TikTok follow block
- `#faq` "Frequently Asked Questions" — an accordion, opening with the most popular dishes
also: The offers each carry their own expiry date in the copy, so an offer that has passed keeps showing until someone removes it. Nothing on the page hides an expired offer.
also: The opening hours are written here and again inside the Contact Us block on this same page, so changing the hours means editing both.
also: The newsletter form has two consent checkboxes, one for email and one for SMS, and both are needed for the form to mean what its copy says.

## events.html → /events
title: Events at Kora Demo – Thai Restaurant in Stamford, CT
purpose: The events page — every upcoming event, switchable between a calendar and a list.
sections:
- `#top` "Upcoming Events" — the page hero
- `#heroImg` — the hero image
- `#events` "All Events" — the events block, with the What to Expect points below it: Live Music & Entertainment, Authentic Thai Cuisine, Warm Community Atmosphere
- `#evtCalBtn` — the tab button that shows the calendar
- `#evtListBtn` — the tab button that shows the list
- `#evtCalendarView` — the calendar view, holding the month label and the day grid
- `#evtListView` — the list view and its container
- `#evtModal` — the pop-up that opens when an event is clicked
- `#contact-strip` "Questions About Events?" — the phone, email and address for event enquiries
also: The calendar grid, the list and the modal are all filled by script at page load, so no event is named anywhere in the markup. An individual event's wording cannot be edited on this page.

## menu.html → /menu
title: Thai Restaurant Menu – Kora Demo in Stamford, CT
purpose: The full menu — every dish, each one individually addressable.
sections:
- `#top` "Our Full Menu" — the page hero
- `#menu-page` "Explore Every Dish" — the whole menu, 87 priced items in twelve categories
- Appetizer — 13 priced items: Crab Rangoon, Curry Puff, Spring Rolls, Po Pia Sod, Shrimp Summer Roll, Tao Hoo Tord, Dumpling, Chicken Satay, Chicken Wing, Lime Chili Shrimp, Crispy Calamari, Mee Grob, Kong Tod
- Chef Special — 14 priced items: Sizzling Pancake, Seafood Delight, Pla Rad Prik, Pla Sam Rod, Salmon Mango Curry, Steamed Ginger Fish, Pineapple Duck Curry, Duck Choo Chee, Duck Ga Prow, Peanut Shrimp Curry, Pra Raam Chicken, Shaking Beef, Laksa Shrimp, Garlic Eggplant Asparagus
- Curry — 9 priced items: Rendang, Red Curry, Green Curry, Penang Curry, Mango Curry, Yellow Curry, Masaman Curry, Jungle Curry, Pineapple Curry
- From the Wok — 8 preparations: Basil, Cashew Nut, Ginger, Garlic, Sambal, Sweet and Sour, Broccoli, Pad Ped
- Noodle — 5 priced items: Pad Thai, Drunken Noodles, Pad See Ew, Pad Woon Sen, Mee Goreng
- Rice — 3 priced items: House Fried Rice, Spicy Fried Rice, Pineapple Fried Rice
- Noodle Soup — 2 priced items: Noodle Soup, Sour and Spicy Noodle Soup
- Salad — 7 priced items: Thai Salad, Somtum, Larb, Nua Nam Tok, Plar Goong, Duck Salad, Yum Woon Sen
- Soup — 4 priced items: Tom Yum Goong, Tom Kha Gai, Sweet Corn Soup, Vegetable Soup
- Side — 10 priced items: Jasmine Rice, Sub Brown Rice, Add Tofu, Thai Sticky Rice, Sub Sticky Rice, Steamed Vegetables, Brown Rice, Peanut Sauce, PRIK NAM PLA, FRIED EGG
- Beverages — 7 priced items: THAI ICE TEA, LYCHEE JUICE, COKE, DIET COKE, SPRITE, GINGER ALE, THAI ICE COFFEE
- Desserts — 4 priced items: MANGO STICKY RICE, FRIED BANANA, COCONUT PUDDING, FRIED ICE CREAM
also: Every dish has its own id of the form <category>-<slug>, so a single dish can be addressed directly. The categories themselves have no ids, so a change to a whole category is located by its heading.
also: Renaming a dish leaves its id pointing at the old name, and the id is what any link to that dish uses.
also: An item named "editor testing" sits in the appetizer group. It is a test entry, not a dish, and it has no id of its own — unlike every real dish on the page.
also: Side, beverage and dessert names are written in capitals while every other category is written in title case, so a change applied to one style will miss the other.

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
