const SPRINTER_API_QPS = 75;

/*
    Dan mentioned a rate limit of 100 QPS for the sprinter test APIs. 
    This is a singleton class with methods for incrementing and decrementing a shared
    token bucket. 

    Each API call will consume 1 token and each second will restore 75 tokens up to a makx of
    75. I'm staying under 100 QPS just to give it some buffer.

    Also this class is pretty limited by only being able to handle 1 token bucket with a
    fixed and known rate ahead of time. Also ideally the token bucket itself would be stored elsewhere
    such as redis.
*/
export default class RateLimiter {
    private static instance: RateLimiter;
    private static tokenBucket: number = SPRINTER_API_QPS;

    private constructor() {
        console.log(`Init Rate Limiter with ${SPRINTER_API_QPS} tokens`);
        RateLimiter.addTokenTimer();
    }

    public static printTokens() {
        console.log(RateLimiter.tokenBucket);
    }

    public static getInstance(): RateLimiter {
        return (RateLimiter.instance ? RateLimiter.instance : new RateLimiter());
    }

    public static async fetchData(url: string): Promise<Response | null> {
        if (RateLimiter.tokenBucket > 0) {
            RateLimiter.tokenBucket--;
            return fetch(url);
        } else {
            console.error(`GET ${url} API Rate Limit Exceeded: ${SPRINTER_API_QPS}`);
            return null; // We can do better by returning more info than just null.
        }
    }

    // Private Members // 

    private static addTokenTimer() {
        setInterval(() => {
            let newValue = RateLimiter.tokenBucket + 75;
            RateLimiter.tokenBucket = Math.min(75, newValue);
        }, 1000);
    }
}
