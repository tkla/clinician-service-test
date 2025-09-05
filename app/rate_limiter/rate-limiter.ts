const SPRINTER_API_QPS = 75;

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
