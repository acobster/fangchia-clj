(ns fangchia.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [clj-time.core :as t]
            [clj-time.format :as f]
            [monger.core :as mg]
            [monger.collection :as mc])
  (:import [com.mongodb MongoOptions ServerAddress]))

; TODO authentication
(def conn  (mg/connect {:host "localhost" :port 27017}))
(def db    (mg/get-db conn "test"))

; Template location
(use 'selmer.parser)
(selmer.parser/set-resource-path! (clojure.java.io/resource "views"))
(selmer.parser/cache-off!)


(defn get-page [slug]
  {:slug slug})

; TODO store/query timestamp instead
(defn get-shows []
  (let [date-str (f/unparse (f/formatter "YYYY-MM-DD H:mm:ss") (t/now))]
    (into-array
      (mc/find-maps db "shows" { :date-time {"$gt" date-str } }))))

(defn get-show [slug]
  {
    :slug slug
    :venue {:name "Ground Zero Music Program"
            :url "http://www.tractortavern.com/"
            :address "15228 Lake Hills Blvd\nBellevue, WA"}
    :date-time (java.util.Date. 2016 7 9 20 30)
    :guests [{:name "Bad Luck" :link "http://bandcamp.com" :performer-type "Organization"} ; TODO offer type dropdown
             {:name "Humidity and Static" :link "http://bandcamp.com"}
             {:name "The Best Dancers"}]
    :cover "NO COVER"
    :note "21+"
    :content "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nNon est ista, inquam, Piso, magna dissensio."})

(defn render-page [slug]
  (try
    (render-file (str slug ".html") {:slug slug})
    (catch java.io.FileNotFoundException e (render-file "404.html" {}))))

(defn render-shows []
  (render-file "shows.html" {:shows (get-shows)}))

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
