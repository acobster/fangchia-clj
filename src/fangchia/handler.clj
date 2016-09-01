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



(defn render-page-content [slug]
  (try
    (render-file (str slug ".html") {:slug slug})
    (catch java.io.FileNotFoundException e (render-file "404.html" {}))))

(defn render-shows []
  (render-file "shows.html" {:shows (get-shows) :shows-class (.getClass (get-shows))}))

(defn render-show [slug]
  (render-file "show.html" (get-show slug)))


(defn render-full-page
  "Render the page template identified by slug"
  [page-content]
    (render-file "index.html" {:content page-content}))

(defn render-page
  [slug]
  (let [page-content (render-page-content slug)]
    (render-full-page page-content)))



; (defn- ajax-route
;   "For the given routing rule form, define a corresponding /ajax route form.
;   The resulting form can be passed, alongside the original route, to the defroutes macro."
;   [rule]
;   (let [[method route & the-rest] rule]
;     (concat
;       (list method (str "/ajax" route))
;       the-rest)))

; (defn- render-page-route
;   "Wrap the routing rule form in a form to call `render-page`"
;   [rule]
;   '(render-page "slug" rule))


(defmacro dynamic-routes [name & routes]
  "Expand argument routes into identical routes and their /ajax counterparts.
  Very similar to the defroutes macro, but requires name (for simplicity)."
  `(defroutes ~name
    ~@(letfn [(dynamic-route [rule]
      ; replace the route handler with one that checks for the `ajax` GET param
      (concat
        (drop-last rule)
        (list (last rule))))] ; TODO ???
      (map #(dynamic-route %) routes))))


; routing!
(dynamic-routes app-routes
  (GET "/" [ajax] (render-page-content "home"))

  (GET "/shows" [ajax] (render-shows))

  (GET "/:slug" [ajax slug] (render-page-content slug))

  (GET "/shows/:slug" [slug] (render-show slug))

  (GET "/sitemap.xml" [] "TODO: sitemap")

  (route/not-found (render-file "404.html" {})))


; DO THE THING
(def app
  (wrap-defaults app-routes site-defaults))
