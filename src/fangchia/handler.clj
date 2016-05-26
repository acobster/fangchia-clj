(ns fangchia.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

; Template location
(use 'selmer.parser)
(selmer.parser/set-resource-path! (clojure.java.io/resource "views"))
(selmer.parser/cache-off!)

; routing!
(defroutes app-routes
  (GET "/" [] (render-file "home.html" {}))
  (GET "/shows" [] (render-file "shows.html" {}))
  (GET "/shows/:slug" [slug] (render-file "show.html" {
    :venue {:name "Ground Zero Music Program"
            :url "http://www.tractortavern.com/"
            :address "15228 Lake Hills Blvd\nBellevue, WA"}
    :date-time (java.util.Date. 2016 8 9 20 30)
    :guests [{:name "Bad Luck" :link "http://bandcamp.com" :type "Organization"} ; TODO offer type dropdown
             {:name "Humidity and Static" :link "http://bandcamp.com"}
             {:name "The Best Dancers"}]
    :cover "NO COVER"
    :note "21+"
    :content "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nNon est ista, inquam, Piso, magna dissensio."}))
  (GET "/sitemap.xml" [] "TODO: sitemap")
  (route/not-found (render-file "404.html" {})))


; DO THE THING
(def app
  (wrap-defaults app-routes site-defaults))
