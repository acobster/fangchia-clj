(defproject fangchia "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [clj-time "0.11.0"]
                 [compojure "1.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [com.novemberain/monger "3.0.2"]
                 [selmer "1.0.4"]]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler fangchia.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}})
