RUN yarn db:cli schema:sync
RUN yarn db:migrate
yarn start:dev