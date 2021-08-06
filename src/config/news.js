const articles_url= 'https://newsapi.org/v2/top-headlines';
const country_code= 'it';
const _api_key='yourApiKey';

export async function getArticles(category) {

    try {
        let articles = await fetch(`${articles_url}?country=${country_code}&category=${category}`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json();
        article = null;

        return result.articles;
    }
    catch(error) {
        throw error;
    }
}