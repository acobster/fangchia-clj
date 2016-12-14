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


; "Model" code
(defn get-page [slug]
  {:slug slug})

; TODO store/query timestamp instead
(defn get-shows []
  (let [date-str (f/unparse (f/formatters :basic-date-time) (t/now))]
    (doall (mc/find-maps db "shows" {}))))

(defn get-show [slug]
  (mc/find-one-as-map db "shows" {:slug slug}))



(defn render-page-content
  "Render content for the page identified by slug, without layout markup"
  [slug]
  ; TODO get this content from the database
  (try
    (render-file (str slug ".html") {:slug slug})
    (catch java.io.FileNotFoundException e (render-file "404.html" {}))))

(defn render-shows
  "Render the shows page, without layout markup"
  []
  (render-file "shows.html" {:shows (get-shows) :shows-class (.getClass (get-shows))}))

(defn render-show [slug]
  (render-file "show.html" (get-show slug)))



(defn render-full-page
  "Render the page template identified by slug"
  [page-content]
    (render-file "index.html" {:content page-content}))

(defn render-page
  "Render a page, with or without containing layout markup depending on ajax"
  [content, ajax]
  (if ajax
    content
    (render-full-page content)))



; routing!
(defroutes app-routes
  (GET "/" [ajax] (render-page (render-page-content "home") ajax))

  (GET "/shows" [ajax] (render-page (render-shows) ajax))

  (GET "/:slug" [ajax slug] (render-page (render-page-content slug) ajax))

  (GET "/shows/:slug" [ajax slug] (render-page (render-show slug) ajax))

  (GET "/sitemap.xml" [] "TODO: sitemap")

  (route/not-found (render-file "404.html" {})))


; DO THE THING
(def app
  (wrap-defaults app-routes site-defaults))
