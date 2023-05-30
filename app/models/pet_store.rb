class PetStore < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :users, through: :items

    has_one :location, dependent: :destroy
    has_many :users, through: :location

    validates :name, presence: true

end
