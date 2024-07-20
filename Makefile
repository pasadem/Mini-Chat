install: install-deps

start:
	npx webpack serve


start-backend:
	npm start --watch --verbose-watch

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku



.PHONY: test
