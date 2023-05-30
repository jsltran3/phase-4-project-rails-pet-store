class Location < ApplicationRecord
    belongs_to :user
    belongs_to :pet_store

    validates :name, presence: true 
end
