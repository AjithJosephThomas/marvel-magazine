# marvel-magazine
To run this project
1)	yarn install
2)	yarn start

The functionalities mentioned in the test are met to the best of my understanding.

Functionality:
1)  Comics view - http://localhost:8080/ or http://localhost:8080/comics
	1)  Loads card view of 20 comics.
	2) Infinte Scroll
	3) Click on filter to open filter
	4) Select series/character and start typing in the combo box. The combo box provides the options.
	5) Select an option to filter. 
	6) Click on a card to see more details of the comic.
	7) Click on the thumbnail in the card to navigate to http://localhost:8080/comics/<comic_id>
	8) Click on character to navigate to the corresponding character details page
2)  Comics detail view -  http://localhost:8080/comics/<comic_id>
    1) Displays:
        1)  Name
        2)  Description
        3)  Price
        4)  Characters
        5)  Series
    2)  Click on character to navigate to the corresponding character details page.
3)  Character view - http://localhost:8080/ or http://localhost:8080/comics
    1)  Loads card view of 20 characters.
    2) Infinte Scroll
    3) Click on a card to see more details of the comic.
    4) Click on the thumbnail in the card to navigate to http://localhost:8080/character/<character_id>
    5) Click on comic to navigate to the corresponding comic details page
4)  Character detail view -  http://localhost:8080/character/<character_id>
    1) Displays:
    1)  Name
    2)  Description
    3)  Creators
    4)  Series
    5)  Click on comic to navigate to the corresponding comic details page.

Improvements:
1)  Bootstrap-sass.
2)  Bootswatch-sass for theming.
3)  Masonary layout.
4)  Normalisation.
5)  Transitions for views.


What is pending:
1) Refactor code with redux-saga as the middleware would be a better suite.
2) Improve infinite scroll to load relevant set of data that merging.
3) Improve normalisation for more detailed schema.
4) Filter based on title/name.
5) Preloaders are being worked out.
6) Refactor ComicTiles and CharacterTiles to have a HOC for scroll handling.
7) Refactor ComicLists and CharacterLists to have a HOC for infinite scroll.
8) Better data cachining mechanism.
