(ns fangchia.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [monger.core :as mg]
            [monger.collection :as mc]
            [monger.operators :refer :all])
  (:import [com.mongodb MongoOptions ServerAddress]))

; TODO authentication
(def conn  (mg/connect {:host "localhost" :port 27017 :connect-timeout 10000}))
(def db    (mg/get-db conn "test"))

; Template location
(use 'selmer.parser)
(selmer.parser/set-resource-path! (clojure.java.io/resource "views"))
(selmer.parser/cache-off!)


(defn get-page [slug]
  {:slug slug})

; TODO store/query timestamp instead
(defn get-shows []
  (let [date-str (f/unparse (f/formatters :basic-date-time) (t/now))]
    (doall (mc/find-maps db "shows" {}))))

(defn get-show [slug]
  (mc/find-one-as-map db "shows" {:slug slug}))

(defn render-page [slug]
  (try
    (render-file (str slug ".html") {:slug slug})
    (catch java.io.FileNotFoundException e (render-file "404.html" {}))))

    (defn render-shows []
      (render-file "shows.html" {:shows (get-shows) :shows-class (.getClass (get-shows))}))

(defn render-show [slug]
  (render-file "show.html" (get-show slug)))


; routing!
(defroutes app-routes
  (GET "/" [] (render-page "home"))

  (GET "/shows" [] (render-shows))

  (GET "/:slug" [slug] (render-page slug))

  (GET "/shows/:slug" [slug] (render-show slug))

  (GET "/sitemap.xml" [] "TODO: sitemap")

  (route/not-found (render-file "404.html" {})))


; DO THE THING
(def app
  (wrap-defaults app-routes site-defaults))
