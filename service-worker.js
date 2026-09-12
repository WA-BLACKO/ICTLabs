/* =====================================================
   ICT LAB SERVICE WORKER
===================================================== */

const CACHE_NAME =
    "ict-lab-v1";


const CORE_FILES = [

    "./",

    "./Main.html",

    "./CSSMain.css",

    "./Main_JS.js",

    "./quizQuestions.js",

    "./chatbot.js",

    "./manifest.json"

];


/* =====================================================
   INSTALL
===================================================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)

                .then(cache => {

                    return cache.addAll(
                        CORE_FILES
                    );

                })

        );


        self.skipWaiting();

    }
);


/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames.map(
                            cache => {

                                if (
                                    cache !== CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cache
                                    );

                                }

                            }
                        )

                    );

                })

        );


        self.clients.claim();

    }
);


/* =====================================================
   FETCH
===================================================== */

self.addEventListener(
    "fetch",
    event => {

        const request =
            event.request;


        /* Only cache GET requests */

        if (
            request.method !== "GET"
        ) {

            return;

        }


        const url =
            new URL(
                request.url
            );


        /* Only handle local website files */

        if (
            url.origin !==
            self.location.origin
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(request)

                .then(cachedResponse => {

                    if (
                        cachedResponse
                    ) {

                        return cachedResponse;

                    }


                    return fetch(request)

                        .then(
                            networkResponse => {

                                if (
                                    !networkResponse ||
                                    networkResponse.status !== 200
                                ) {

                                    return networkResponse;

                                }


                                const responseCopy =
                                    networkResponse.clone();


                                caches
                                    .open(CACHE_NAME)

                                    .then(cache => {

                                        cache.put(
                                            request,
                                            responseCopy
                                        );

                                    });


                                return networkResponse;

                            }
                        )

                        .catch(() => {

                            /* If navigation fails offline */

                            if (
                                request.mode ===
                                "navigate"
                            ) {

                                return caches.match(
                                    "./Main.html"
                                );

                            }

                        });

                })

        );

    }
);