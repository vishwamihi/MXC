const api = Buffer.from('aHR0cHM6Ly9zYWNoaWJvdC1jaW5lLnVwLnJhaWx3YXkuYXBwLw==', 'base64').toString('utf-8');

module.exports = {
api:api,
site:'https://cinesubz.co/',
movie:'movies/',
tvshow:'tvshows/',
episode:'episodes/',
cinesearch:'cinesearch?q=',
cinetvshow:'cinetvshow?url=',
cinemovie:'cinemovie?url=',
cineepisode:'cineepisode?url=',
cinedllink:'cinedllink?url=',
apikey : 'api-key='
}