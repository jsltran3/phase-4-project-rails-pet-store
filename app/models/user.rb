class User < ApplicationRecord
    has_many :items
    has_many :pet_stores, through: :items
    
    has_secure_password
  
    has_one :location
    has_many :pet_stores, through: :location
  
    validates :username, presence: true, uniqueness: true
end
